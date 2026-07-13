import type { GetStaticPaths, GetStaticProps } from "next";
import { Page } from "@/components/Layout/Page";
import type { RouteItem, TocItem } from "@/utils/docs";
import { getPageByPath } from "@/utils/docs";
import { getTocFromMarkdown, readDocSource } from "@/utils/markdown";
import { getRouteMeta, getStaticDocPaths, normalizePath } from "@/utils/routes";

type Props = {
  path: string;
  source: string;
  toc: TocItem[];
  prevRoute: RouteItem | null;
  nextRoute: RouteItem | null;
};

export default function MarkdownPage({
  path,
  source,
  toc,
  prevRoute,
  nextRoute,
}: Props) {
  const page = getPageByPath(path);

  if (!page) {
    return null;
  }

  return (
    <Page
      page={page}
      source={source}
      toc={toc}
      prevRoute={prevRoute}
      nextRoute={nextRoute}
    />
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getStaticDocPaths(),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const path = normalizePath(params?.markdownPath as string[] | undefined);
  const page = getPageByPath(path);

  if (!page) {
    return {
      notFound: true,
    };
  }

  const { prevRoute, nextRoute } = getRouteMeta(path);
  const source = page.docPath ? await readDocSource(page.docPath) : "";
  const toc = getTocFromMarkdown(source);

  return {
    props: {
      path,
      source,
      toc,
      prevRoute,
      nextRoute,
    },
  };
};
