import * as cheerio from "cheerio";
import type { PostData, PostParser } from "../post-parser.ts";

export class StandardPostParser implements PostParser {
  parse(html: string, url: string): PostData {
    const $ = cheerio.load(html);

    const title = $("h1.entry-title").first().text().trim();
    const dateEl = $("time.entry-date").first();
    const date = dateEl.attr("datetime") || dateEl.text().trim();
    const content = $("div.entry-content").first().html() || "";
    const categories: string[] = [];
    $("footer.entry-footer .cat-links a").each((_, el) => {
      categories.push($(el).text().trim());
    });

    return {
      title: title || "Untitled",
      date: date || new Date().toISOString().split("T")[0],
      content,
      categories,
      source: url,
    };
  }
}
