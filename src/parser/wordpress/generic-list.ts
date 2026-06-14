import * as cheerio from "cheerio";
import type { ListItem, ListParser } from "../list-parser.ts";

export class GenericPagedParser implements ListParser {
  parse(html: string, baseUrl: string): ListItem[] {
    const $ = cheerio.load(html);
    const items: ListItem[] = [];

    $("article.post").each((_, el) => {
      const $el = $(el);
      const $link = $el.find("h2.entry-title a");
      const href = $link.attr("href");
      const title = $link.text().trim();

      if (href && title) {
        const url = href.startsWith("http") ? href : new URL(href, baseUrl).href;
        items.push({ url, title });
      }
    });

    return items;
  }
}
