export interface Book {
  title: string;
  author: string;
  status?: number;
  cover?: string | undefined;
  year: string;
  noofpages: number;
  description: string;
  isbn: string;
  language?: string;
  genre: string;
  retailPrice?: string | undefined;
  retailPriceCurrency?: string | undefined;
  buyLink?: string | undefined;
  noofpagesread?: number;
  startdate?: string;
  finishdate?: string;
  notes?: string;
  score?: string;
}
