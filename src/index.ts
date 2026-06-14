import { extractAndDownloadImages } from "./asset-downloader.ts";
import { loadConfig } from "./config.ts";
import { convertHtmlToMarkdown } from "./converter.ts";
import { delay, fetchWithRetry } from "./fetcher.ts";
import type { ListParser } from "./parser/list-parser.ts";
import { SimpleYearlyArchiveParser } from "./parser/wordpress/archive-list.ts";
import { GenericPagedParser } from "./parser/wordpress/generic-list.ts";
import { StandardPostParser } from "./parser/wordpress/standard-post.ts";
import { buildExistingUrlSet, writePost } from "./writer.ts";

function parseArgs() {
  const args = process.argv.slice(2);
  const config: {
    path?: string;
    dryRun?: boolean;
    limit?: number;
    forceUpdate?: boolean;
  } = {};

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case "--config":
        config.path = args[++i];
        break;
      case "--dry-run":
        config.dryRun = true;
        break;
      case "--limit":
        config.limit = Number.parseInt(args[++i], 10);
        break;
      case "--force-update":
        config.forceUpdate = true;
        break;
    }
  }

  return config;
}

function getListParser(strategy: string): ListParser {
  switch (strategy) {
    case "simple-yearly-archive":
      return new SimpleYearlyArchiveParser();
    case "paged":
      return new GenericPagedParser();
    default:
      return new SimpleYearlyArchiveParser();
  }
}

async function main() {
  const args = parseArgs();
  if (!args.path) {
    console.error(
      "用法: bun run src/index.ts --config <配置文件路径> [--dry-run] [--limit <n>] [--force-update]",
    );
    process.exit(1);
  }

  const configPath = args.path;
  const config = loadConfig(configPath);
  const outputDir = config.output.dir;
  const existingUrls = args.forceUpdate ? new Set<string>() : buildExistingUrlSet(outputDir);

  console.log(`加载配置: ${config.name}`);
  console.log(`已有文章: ${existingUrls.size} 篇`);

  // 抓取列表页
  console.log(`抓取列表页: ${config.list.url}`);
  const listResponse = await fetchWithRetry(config.list.url, {
    userAgent: config.fetch.userAgent,
    timeoutMs: config.fetch.timeoutMs,
    maxRetries: config.fetch.maxRetries,
  });
  const listHtml = await listResponse.text();

  const listParser = getListParser(config.list.strategy);
  const items = listParser.parse(listHtml, config.baseUrl);
  console.log(`列表页解析到 ${items.length} 篇文章`);

  // 过滤已存在的文章
  const newItems = items.filter((item) => !existingUrls.has(item.url));
  console.log(`需要抓取的新文章: ${newItems.length} 篇`);

  if (args.limit) {
    console.log(`限制抓取前 ${args.limit} 篇`);
  }

  const targetItems = args.limit ? newItems.slice(0, args.limit) : newItems;

  if (args.dryRun) {
    for (const item of targetItems) {
      console.log(`[DRY-RUN] ${item.date || "???"} | ${item.title} | ${item.url}`);
    }
    console.log("干运行完成，未写入任何文件");
    return;
  }

  // 逐个抓取文章
  const postParser = new StandardPostParser();
  let success = 0;
  let failed = 0;

  for (let i = 0; i < targetItems.length; i++) {
    const item = targetItems[i];
    console.log(`[${i + 1}/${targetItems.length}] 抓取: ${item.title}`);

    try {
      await delay(config.fetch.delayMs);
      const response = await fetchWithRetry(item.url, {
        userAgent: config.fetch.userAgent,
        timeoutMs: config.fetch.timeoutMs,
        maxRetries: config.fetch.maxRetries,
      });
      const html = await response.text();
      const postData = postParser.parse(html, item.url);

      const contentHtml = postData.content;

      // 先写入 markdown 获取实际目录路径
      const markdown = convertHtmlToMarkdown(contentHtml);
      const postWithMarkdown = { ...postData, content: markdown };
      const postDir = writePost(postWithMarkdown, outputDir, config);

      // 下载图片到实际目录
      if (config.output.downloadImages) {
        const result = await extractAndDownloadImages(contentHtml, postDir, config.baseUrl);
        // 如果有图片下载成功，更新 markdown 中的图片链接
        if (result.imageMap.size > 0) {
          const updatedMarkdown = convertHtmlToMarkdown(result.html);
          const updatedPost = { ...postData, content: updatedMarkdown };
          writePost(updatedPost, outputDir, config);
        }
      }

      success++;
    } catch (error) {
      console.error(`  失败: ${item.url}`, error instanceof Error ? error.message : error);
      failed++;
    }
  }

  console.log(`\n完成: ${success} 篇成功, ${failed} 篇失败`);
}

main().catch((error) => {
  console.error("程序出错:", error);
  process.exit(1);
});
