import {BookStatus} from "./bookstatus";

export interface Book {
  title: string;
  author: string;
  status?: number;
  cover: string;
  year: string;
  noofpages: number;
  description: string;
  isbn: string;
  language: string;
  genre: string;
}
