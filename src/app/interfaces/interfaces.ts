// Se exportan los dos "interfaces" que vamos a utilizar:
// los datos completos y el array de articulos

export interface IArticulo {
  status: string;
  totalResults: number;
  articles: Article[];
}

export interface Article {
  source: Source;
  author?: string;
  title: string;
  description?: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  content?: string;
}

interface Source {
  id?: string;
  name: string;
}
  
