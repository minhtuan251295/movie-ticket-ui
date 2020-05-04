export interface Genre {
  name: string,
  imageURL: string,
  id?: number,
}

export interface Movie {
  name: string,
  director: string,
  genreId: number,
  imdb: number,
  premiereDate: string | Date,
  description: string,
  duration: number,
  id?: string | number,
}

export interface Cinema {
  name: string,
  address: string,
  id?: string | number,
}