import { readFileSync } from "node:fs";

export type ListStrategy = "simple-yearly-archive" | "paged" | "wp-rest-api";

export type ListConfig = {
  strategy: ListStrategy;
  url: string;
  selectors: {
    item: string;
    link: string;
    date?: string;
    category?: string;
  };
};

export type PostConfig = {
  selectors: {
    title: string;
    date: string;
    dateAttr?: string;
    content: string;
    category?: string;
  };
};

export type FetchConfig = {
  userAgent: string;
  delayMs: number;
  maxRetries: number;
  timeoutMs: number;
};

export type OutputConfig = {
  dir: string;
  naming: string;
  frontMatter: boolean;
  downloadImages: boolean;
  imageDir: string;
};

export type BlogConfig = {
  name: string;
  baseUrl: string;
  list: ListConfig;
  post: PostConfig;
  fetch: FetchConfig;
  output: OutputConfig;
};

export function loadConfig(path: string): BlogConfig {
  const raw = readFileSync(path, "utf-8");
  const config = JSON.parse(raw) as BlogConfig;

  if (!config.name) throw new Error("配置缺少 name 字段");
  if (!config.baseUrl) throw new Error("配置缺少 baseUrl 字段");
  if (!config.list?.url) throw new Error("配置缺少 list.url 字段");
  if (!config.post?.selectors?.title) throw new Error("配置缺少 post.selectors.title 字段");
  if (!config.post?.selectors?.content) throw new Error("配置缺少 post.selectors.content 字段");

  return config;
}
