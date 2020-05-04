export interface Genre {
  name: string,
  imageURL: string,
  id?: number,
}

export interface Movie {
  name: string,
  director: string,
  imageURL: string,
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

export interface Room {
  code: string,
  cinemaId: string,
  id?: string | number,
}

export interface Schedule {
  movieId: string,
  roomId: string,
  startTime: string | Date,
  id?: string | number,
}

export interface User {
  email: string,
  password: string,
  name: string,
  id?: string | number,
}

export interface Card {
  userId: string,
  level: string,
  id?: string | number,
}