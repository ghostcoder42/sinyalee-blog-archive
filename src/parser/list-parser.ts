export type ListItem = {
  url: string;
  title: string;
  date?: string;
  category?: string;
};

export interface ListParser {
  parse(html: string, baseUrl: string): ListItem[];
}
