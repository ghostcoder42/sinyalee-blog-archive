import * as cheerio from "cheerio";
import type { ListItem, ListParser } from "../list-parser.ts";

export class SimpleYearlyArchiveParser implements ListParser {
  parse(html: string, baseUrl: string): ListItem[] {
    const $ = cheerio.load(html);
    const items: ListItem[] = [];

    $(".sya_postcontent").each((_, el) => {
      const $el = $(el);
      const $link = $el.find("a.sya_postlink");
      const href = $link.attr("href");
      const title = $link.text().trim();
      const date = $el.find(".sya_date").text().trim();
      const category = $el.find(".sya_categories").text().trim();

      if (href && title) {
        const url = href.startsWith("http") ? href : new URL(href, baseUrl).href;
        items.push({
          url,
          title,
          date: date || undefined,
          category: category || undefined,
        });
      }
    });

    return items;
  }
}
