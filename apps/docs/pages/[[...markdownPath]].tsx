import type { GetStaticPaths, GetStaticProps } from "next";
import { Page } from "@/components/Layout/Page";
import type { RouteItem } from "@/content/routes";
import { getPageByPath } from "@/content/routes";
import { getRouteMeta, getStaticDocPaths, normalizePath } from "@/utils/routes";

type Props = {
  path: string;
  prevRoute: RouteItem | null;
  nextRoute: RouteItem | null;
};

export default function MarkdownPage({ path, prevRoute, nextRoute }: Props) {
  const page = getPageByPath(path);

  if (!page) {
    return null;
  }

  return <Page page={page} prevRoute={prevRoute} nextRoute={nextRoute} />;
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

  return {
    props: {
      path,
      prevRoute,
      nextRoute,
    },
  };
};
