import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ReadingProgress } from "@/components/motion/reading-progress";
import { CtaBand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/ui/page-hero";
import { getPost, getPostSlugs } from "@/lib/content/insights";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/insights/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getPost(slug);

  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/insights/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `/insights/${post.slug}`,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
    },
  };
}

/** Typography for MDX output — the prose styles live here, not in globals. */
const components = {
  h2: (props: React.ComponentProps<"h2">) => (
    <h2 className="mt-12 mb-4 text-h2 text-ink-900" {...props} />
  ),
  h3: (props: React.ComponentProps<"h3">) => (
    <h3 className="mt-9 mb-3 text-h3 text-ink-900" {...props} />
  ),
  p: (props: React.ComponentProps<"p">) => (
    <p className="my-5 leading-relaxed text-ink-700" {...props} />
  ),
  ul: (props: React.ComponentProps<"ul">) => (
    <ul className="my-5 list-disc space-y-2 pl-6 text-ink-700" {...props} />
  ),
  ol: (props: React.ComponentProps<"ol">) => (
    <ol className="my-5 list-decimal space-y-2 pl-6 text-ink-700" {...props} />
  ),
  li: (props: React.ComponentProps<"li">) => (
    <li className="leading-relaxed" {...props} />
  ),
  a: (props: React.ComponentProps<"a">) => (
    <a
      className="font-medium text-accent underline underline-offset-4"
      {...props}
    />
  ),
  blockquote: (props: React.ComponentProps<"blockquote">) => (
    <blockquote
      className="my-7 border-l-2 border-accent bg-mist-50 py-4 pr-4 pl-6 font-display text-lg text-ink-900"
      {...props}
    />
  ),
  table: (props: React.ComponentProps<"table">) => (
    // Wide tables scroll inside their own container, never the page.
    <div className="my-7 overflow-x-auto">
      <table className="w-full border-collapse text-left text-[0.9375rem]" {...props} />
    </div>
  ),
  th: (props: React.ComponentProps<"th">) => (
    <th
      className="border-b border-mist-200 py-3 pr-4 font-semibold text-ink-900"
      {...props}
    />
  ),
  td: (props: React.ComponentProps<"td">) => (
    <td className="border-b border-mist-100 py-3 pr-4 text-ink-700" {...props} />
  ),
  strong: (props: React.ComponentProps<"strong">) => (
    <strong className="font-semibold text-ink-900" {...props} />
  ),
  hr: () => <hr className="my-10 border-mist-200" />,
};

export default async function InsightPage(props: PageProps<"/insights/[slug]">) {
  const { slug } = await props.params;
  const post = await getPost(slug);

  if (!post) notFound();

  return (
    <>
      <ReadingProgress />

      <JsonLd
        data={[
          articleJsonLd({
            title: post.title,
            description: post.description,
            slug: post.slug,
            publishedAt: post.publishedAt,
            updatedAt: post.updatedAt,
          }),
          breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Insights", href: "/insights" },
            { name: post.title, href: `/insights/${post.slug}` },
          ]),
        ]}
      />

      <PageHero
        eyebrow={post.tag ?? "Insight"}
        title={post.title}
        lead={post.description}
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Insights", href: "/insights" },
        ]}
      >
        <p className="text-sm text-white/55">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span aria-hidden> · </span>
          {post.readingMinutes} min read
        </p>
      </PageHero>

      <article className="section-y bg-white">
        <div className="container-site">
          <div className="mx-auto max-w-[68ch]">
            <MDXRemote source={post.content} components={components} />

            <div className="mt-14 border-t border-mist-200 pt-8">
              <Link
                href="/insights"
                className="font-medium text-accent underline-offset-4 hover:underline"
              >
                &larr; All insights
              </Link>
            </div>
          </div>
        </div>
      </article>

      <CtaBand />
    </>
  );
}
