import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { BlogConfig } from "./config.ts";
import type { PostData } from "./parser/post-parser.ts";
import { generateSlug } from "./utils/slug.ts";

export function ensureDir(path: string): void {
  mkdirSync(path, { recursive: true });
}

function scanDirForUrls(dir: string, set: Set<string>): void {
  if (!existsSync(dir)) return;

  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDirForUrls(fullPath, set);
    } else if (entry.name === "index.md") {
      const content = readFileSync(fullPath, "utf-8");
      const match = content.match(/^source:\s*(.+)$/m);
      if (match) {
        set.add(match[1].trim());
      }
    }
  }
}

export function buildExistingUrlSet(outputDir: string): Set<string> {
  const set = new Set<string>();
  scanDirForUrls(outputDir, set);
  return set;
}

export function writePost(post: PostData, outputDir: string, config: BlogConfig): string {
  const { year, slug } = generateSlug(post.title, post.date);
  const postDir = join(outputDir, year, slug);
  ensureDir(postDir);

  const frontMatter = config.output.frontMatter
    ? [
        "---",
        `title: "${post.title}"`,
        `date: ${post.date}`,
        `categories: [${post.categories.map((c) => `"${c}"`).join(", ")}]`,
        `source: ${post.source}`,
        "---",
        "",
      ].join("\n")
    : "";

  const markdown = frontMatter + post.content;
  writeFileSync(join(postDir, "index.md"), markdown, "utf-8");

  return postDir;
}
