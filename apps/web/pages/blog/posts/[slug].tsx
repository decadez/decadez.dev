import Image from "next/image";
import { GetStaticPaths, GetStaticProps } from "next";

import BlogHeader from "@/components/blog/BlogHeader";
import SkipToMain from "@/components/SkipToMain";
import SocialLinks from "@/components/SocialLinks";
import AppHead, { Meta } from "@/components/AppHead";
import Footer from "@/components/Footer";
import { compilePostMarkdown } from "utils/markdownToHtml";
import type { TocItem, RouteItem } from "utils/post-navigation";
import { Toc } from "@/components/blog/navigation/Toc";
import { DocsFooter } from "@/components/blog/navigation/Footer";
import { getAllPosts, getPostBySlug } from "utils/api";
import PostBody from "@/components/blog/PostBody";
import Tag from "@/components/blog/Tag";
import DateTime from "@/components/DateTime";
import HeadCategory from "@/components/blog/HeadCategory";
import SharePost from "@/components/blog/SharePost";

export interface MdxMeta extends Meta {
  title: string;
  datetime: string;
  excerpt: string;
  slug: string;
  category: string;
  coverImage?: string;
  tags?: string[];
  content: string;
  coverImageWidth?: string;
  coverImageHeight?: string;
  featured: boolean;
  language: "English";
}

type Props = {
  post: MdxMeta;
  toc: TocItem[];
  prevRoute: RouteItem | null;
  nextRoute: RouteItem | null;
};

const BlogLayout: React.FC<Props> = ({ post, toc, prevRoute, nextRoute }) => {
  const postUrl = `${(process.env.NEXT_PUBLIC_URL || "https://decadez.github.io/decadez.dev").replace(/\/$/, "")}/blog/posts/${post.slug}/`;
  return (
    <>
      <AppHead
        title={`${post.title} - decadez.dev`}
        url={postUrl}
        meta={post}
      />
      <div className="blog-page">
        <div className="blog-selection">
          <SkipToMain />
          <BlogHeader />
          <SocialLinks />
          <main id="main" className="blog-main post-navigation-layout">
            <article className="blog-section">
              <h1 className="font-semibold md:font-bold text-3xl md:text-4xl">
                {post.title}
              </h1>
              <div className="mt-2 mb-1 italic blog-accent-text">
                <DateTime datetime={post.datetime} />
              </div>
              <HeadCategory category={post.category} />
              {post.tags && (
                <div className="my-2">
                  {post.tags.map((tag: string) => (
                    <Tag tag={tag} key={tag} />
                  ))}
                </div>
              )}
              {post.coverImage && (
                <div className="bg-blogmist/60 dark:bg-blogcarddark">
                  <Image
                    src={post.coverImage}
                    alt={post.coverImageAlt || "Picture"}
                    sizes="100vw"
                    style={{ width: "100%", height: "auto" }}
                    priority
                    width={Number(post.coverImageWidth) || 1200}
                    height={Number(post.coverImageHeight) || 700}
                  />
                </div>
              )}
              <PostBody content={post.content} />
              <SharePost title={post.title} url={postUrl} />
              {(prevRoute || nextRoute) && (
                <DocsFooter prevRoute={prevRoute} nextRoute={nextRoute} />
              )}
            </article>
            <Toc headings={toc} />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = getPostBySlug(params!.slug as string, [
    "title",
    "datetime",
    "description",
    "slug",
    "author",
    "content",
    "ogImage",
    "ogImageAlt",
    "coverImage",
    "coverImageWidth",
    "coverImageHeight",
    "category",
    "tags",
    "type",
  ]);
  const { content, toc } = await compilePostMarkdown(
    (post.content as string) || ""
  );
  const posts = getAllPosts(["slug", "title", "datetime"]);
  const index = posts.findIndex((item) => item.slug === post.slug);
  const route = (item: (typeof posts)[number] | undefined): RouteItem | null =>
    item
      ? { path: `/blog/posts/${item.slug}`, title: item.title as string }
      : null;

  return {
    props: {
      toc,
      prevRoute: index > 0 ? route(posts[index - 1]) : null,
      nextRoute: index >= 0 ? route(posts[index + 1]) : null,
      post: {
        ...post,
        content,
      },
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
};

export default BlogLayout;
