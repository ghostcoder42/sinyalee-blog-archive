export type PostData = {
  title: string;
  date: string;
  content: string;
  categories: string[];
  source: string;
};

export interface PostParser {
  parse(html: string, url: string): PostData;
}
