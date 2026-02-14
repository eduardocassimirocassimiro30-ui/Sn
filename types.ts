
export enum Category {
  ULTIMAS = 'Últimas',
  POLICIA = 'Polícia & Justiça',
  CULTURA = 'Cultura de Rua',
  NEGOCIOS = 'Negócios & Poder',
  RADIO = 'Rádio & Opinião'
}

export interface Comment {
  id: string;
  author: string;
  text: string;
  likes: number;
}

export interface NewsItem {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  category: Category;
  author: string;
  date: string;
  imageUrl: string;
  likes: number;
  comments: Comment[];
  isFake?: boolean;
  location: {
    lat: number;
    lng: number;
    name: string;
  };
}

export interface NeighborhoodStats {
  name: string;
  dangerLevel: number;
  activeGangs: string[];
}
