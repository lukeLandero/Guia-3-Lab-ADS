export interface Book {
    id: string;
    title: string;
    author: string;
    cover: string; // URL
    genre: string[];
  }
  
  export type Genre = "Romance" | "Fantasy" | "Mystery" | "Sci-Fi";