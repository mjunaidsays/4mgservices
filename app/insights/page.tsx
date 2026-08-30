import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { RevealItem, Stagger } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/ui/page-hero";
import { getPosts } from "@/lib/content/insights";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Practical guidance on freight, customs clearance and international trade from the team at 4M Global Services.",
  alternates: { canonical: "/insights" },
};

export default async function InsightsPage() {
  const posts = await getPosts();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Insights", href: "/insights" },
        ])}
      />

      <PageHero
        eyebrow="Insights"
        title="Notes from the freight desk"
        lead="Practical guidance on shipping, clearance and international trade — written from the work we do every day, not from a keyword list."
        crumbs={[{ name: "Home", href: "/" }]}
      />

      <section className="section-y bg-white">
        <div className="container-site">
          {posts.length === 0 ? (
            <p className="text-lead text-ink-600">
              New articles are on the way. In the meantime, our{" "}
              <Link
                href="/services"
                className="font-medium text-accent underline underline-offset-4"
              >
                service pages
              </Link>{" "}
              answer the questions we get asked most.
            </p>
          ) : (
            <Stagger className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <RevealItem key={post.slug} small className="h-full">
                  <article className="h-full">
                    <Link
                      href={`/insights/${post.slug}`}
                      className="group flex h-full flex-col rounded-card border border-mist-200 bg-white p-7 shadow-e1 transition-[transform,box-shadow,border-color] duration-160 ease-out-quart hover:-translate-y-1 hover:border-transparent hover:shadow-e2 motion-reduce:hover:translate-y-0"
                    >
                      <div className="flex items-center gap-3 text-sm text-ink-400">
                        {post.tag && (
                          <span className="rounded-full bg-[var(--brand-accent-tint)] px-2.5 py-1 text-xs font-medium text-accent">
                            {post.tag}
                          </span>
                        )}
                        <time dateTime={post.publishedAt}>
                          {formatDate(post.publishedAt)}
                        </time>
                      </div>

                      <h2 className="mt-4 font-display text-xl leading-snug font-semibold text-ink-900">
                        {post.title}
                      </h2>

                      <p className="mt-3 flex-1 leading-relaxed text-ink-600">
                        {post.description}
                      </p>

                      <div className="mt-6 flex items-center justify-between text-sm">
                        <span className="text-ink-400">
                          {post.readingMinutes} min read
                        </span>
                        <ArrowUpRight
                          aria-hidden
                          className="size-5 text-accent transition-transform duration-160 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                        />
                      </div>
                    </Link>
                  </article>
                </RevealItem>
              ))}
            </Stagger>
          )}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
