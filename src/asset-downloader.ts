import { mkdirSync, writeFileSync } from "node:fs";
import { basename, dirname, extname } from "node:path";
import * as cheerio from "cheerio";

export async function downloadImage(url: string, outputPath: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`下载图片失败: ${url} (状态码 ${response.status})`);
  }
  const buffer = await response.arrayBuffer();
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, new Uint8Array(buffer));
  return `./assets/${basename(outputPath)}`;
}

export async function extractAndDownloadImages(
  html: string,
  outputDir: string,
  baseUrl: string,
): Promise<{ html: string; imageMap: Map<string, string> }> {
  const $ = cheerio.load(html);
  const imageMap = new Map<string, string>();

  const images = $("img");
  for (let i = 0; i < images.length; i++) {
    const el = images[i];
    const src = $(el).attr("src");
    if (!src) continue;

    const absoluteUrl = src.startsWith("http") ? src : new URL(src, baseUrl).href;
    const ext = extname(new URL(absoluteUrl).pathname) || ".jpg";
    const filename = `image-${i + 1}${ext}`;
    const outputPath = `${outputDir}/assets/${filename}`;

    try {
      const localPath = await downloadImage(absoluteUrl, outputPath);
      imageMap.set(src, localPath);
      $(el).attr("src", localPath);
    } catch {
      // 下载失败时保留原始链接
    }
  }

  return { html: $.html(), imageMap };
}
