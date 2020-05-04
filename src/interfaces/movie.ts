export interface Movie {
  name: string,
  director: string,
  genreId: number,
  imdb: number,
  premiereDate: string | Date,
  id?: string | number,
}