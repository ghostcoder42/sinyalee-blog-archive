import * as cheerio from "cheerio";
import TurndownService from "turndown";

function isInvisibleColor(style: string): boolean {
  const lower = style.toLowerCase();
  if (lower.includes("#ffffff00")) return true;
  if (lower.includes("transparent")) return true;
  const rgbaMatch = lower.match(/rgba\([^)]+,\s*0\s*\)/);
  if (rgbaMatch) return true;
  return false;
}

function isDash(text: string): boolean {
  return /^[\s\u2013\u2014-]+$/.test(text.trim());
}

export function createConverter(): TurndownService {
  const turndown = new TurndownService({
    headingStyle: "atx",
    bulletListMarker: "-",
    codeBlockStyle: "fenced",
  });

  // 隐藏文字规则
  turndown.addRule("invisible", {
    filter: (node) => {
      if (node.nodeType !== 1) return false;
      const el = node as HTMLElement;
      const style = el.getAttribute("style") || "";
      return isInvisibleColor(style);
    },
    replacement: (content) => {
      if (isDash(content)) return "\n\n---\n\n";
      return "";
    },
  });

  // iframe 规则（YouTube）
  turndown.addRule("iframe", {
    filter: "iframe",
    replacement: (_content, node) => {
      const el = node as HTMLElement;
      const src = el.getAttribute("src") || "";
      if (src.includes("youtube") || src.includes("youtu.be")) {
        return `[▶ YouTube](${src})`;
      }
      return "";
    },
  });

  // 移除 class 和 style 属性的预处理
  turndown.addRule("cleanAttributes", {
    filter: () => false,
    replacement: () => "",
  });

  return turndown;
}

export function convertHtmlToMarkdown(html: string): string {
  const $ = cheerio.load(html);

  // 先处理隐藏文字，再移除 style/class
  $("*").each((_, el) => {
    const $el = $(el);
    const style = $el.attr("style") || "";
    if (isInvisibleColor(style)) {
      const text = $el.text().trim();
      if (isDash(text)) {
        $el.replaceWith("<hr>");
      } else {
        $el.remove();
      }
    }
  });

  // 移除所有 class 和 style 属性
  $("*").each((_, el) => {
    const $el = $(el);
    $el.removeAttr("class");
    $el.removeAttr("style");
  });

  const cleanHtml = $.html();
  const turndown = createConverter();
  return turndown.turndown(cleanHtml);
}
