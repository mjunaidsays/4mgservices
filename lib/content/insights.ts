import "server-only";

import fs from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";

/**
 * Insights are MDX files in `content/insights`. No CMS, no login, no monthly
 * cost — the owner (or we) add a `.mdx` file and it appears.
 *
 * Frontmatter contract:
 *   title, description, publishedAt (YYYY-MM-DD), optional updatedAt,
 *   optional tag, optional draft: true
 */

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  tag?: string;
  draft?: boolean;
  readingMinutes: number;
};

export type Post = PostMeta & { content: string };

const CONTENT_DIR = path.join(process.cwd(), "content", "insights");

function readingTime(markdown: string) {
  const words = markdown.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

async function listFiles(): Promise<string[]> {
  try {
    const entries = await fs.readdir(CONTENT_DIR);
    return entries.filter((entry) => entry.endsWith(".mdx"));
  } catch {
    // No content directory yet — the index simply renders empty.
    return [];
  }
}

async function readPost(file: string): Promise<Post> {
  const raw = await fs.readFile(path.join(CONTENT_DIR, file), "utf8");
  const { data, content } = matter(raw);

  return {
    slug: file.replace(/\.mdx$/, ""),
    title: String(data.title ?? "Untitled"),
    description: String(data.description ?? ""),
    publishedAt: String(data.publishedAt ?? "1970-01-01"),
    updatedAt: data.updatedAt ? String(data.updatedAt) : undefined,
    tag: data.tag ? String(data.tag) : undefined,
    draft: data.draft === true,
    readingMinutes: readingTime(content),
    content,
  };
}

/** Strip the body — listings only ever need the metadata. */
function toMeta(post: Post): PostMeta {
  return {
    slug: post.slug,
    title: post.title,
    description: post.description,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    tag: post.tag,
    draft: post.draft,
    readingMinutes: post.readingMinutes,
  };
}

/** Published posts, newest first. Drafts are excluded from every listing. */
export async function getPosts(): Promise<PostMeta[]> {
  const files = await listFiles();
  const posts = await Promise.all(files.map(readPost));

  return posts
    .filter((post) => !post.draft)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .map(toMeta);
}

export async function getPost(slug: string): Promise<Post | undefined> {
  const files = await listFiles();
  if (!files.includes(`${slug}.mdx`)) return undefined;

  const post = await readPost(`${slug}.mdx`);
  return post.draft ? undefined : post;
}

export async function getPostSlugs(): Promise<string[]> {
  const posts = await getPosts();
  return posts.map((post) => post.slug);
}
