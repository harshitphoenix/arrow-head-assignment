import axios from "axios";
import { Movie } from "../types/Movie";
import { movieMapper } from "../utils";

const BASE_URL = process.env.REACT_APP_OMDB_URL;
const BASE_BACKEND_URL = "http://localhost:5000";

export const fetchMovies = async (filter: string): Promise<Movie[] | null> => {
  try {
    const response = await axios.post(`${BASE_BACKEND_URL}/movies/get-movies`, {
      filter,
    });

    let moviesResponse;

    if (response.data.data) {
      moviesResponse = response.data.data.map((movie: any) => {
        return movieMapper(movie);
      });
    }
    return moviesResponse;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchMovieSugestions = async (
  searchString: string
): Promise<any | null> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/?s=${searchString}&apikey=${process.env.REACT_APP_OMDB_API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const addMovie = async (movie: Movie): Promise<Movie | null> => {
  try {
    const response = await axios.post(`${BASE_BACKEND_URL}/movies/add-movie`, {
      movie,
    });
    console.log(response.data.data);
    let movieResponse: Movie;
    if (response.data.data as any) {
      movieResponse = movieMapper(response?.data?.data);
      return movieResponse;
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const movieUpdate = async (movie: Movie): Promise<Movie | null> => {
  try {
    const response = await axios.post(
      `${BASE_BACKEND_URL}/movies/update-movie`,
      {
        movie,
      }
    );
    let movieResponse: Movie;
    if (response.data.data as any) {
      movieResponse = movieMapper(response?.data?.data);
      return movieResponse;
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
