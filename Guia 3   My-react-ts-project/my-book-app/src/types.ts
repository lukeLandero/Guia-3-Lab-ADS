export interface Book {
    key: string;
    title: string;
    author_name?: string[];
    authors?: { name: string; key: string }[];
    cover_id?: number;
    first_publish_year?: number;
    description?: string | { value?: string };
    subject_key?: string[];
    subjects?: string[]; 
    cover?: string;
  }
  
  export interface Filter {
    name: string;
    value: string;
    checked: boolean;
  }
  

  export interface OpenLibraryResponse {
    works: Book[];
  }  