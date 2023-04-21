import { createSlice } from "@reduxjs/toolkit";
import { Movie } from "../types/Movie";
import { MovieSuggestion } from "../types/MoviesSuggestion";

interface AppState {
  movies: Movie[];
  databaseId?: string | null;
  editingMovie?: Movie | null;
  isEditing: boolean;
  moviesSuggestion?: MovieSuggestion[];
  isSearching: boolean;
  isPending?: boolean;
  isNewMovieAdding?: boolean;
}

const initialState: AppState = {
  movies: [],
  databaseId: null,
  editingMovie: null,
  isEditing: false,
  moviesSuggestion: [],
  isSearching: false,
  isPending: true,
  isNewMovieAdding: false,
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setMovies(state, action) {
      state.movies = action.payload;
    },
    setMovieSuggestion(state, action) {
      state.moviesSuggestion = action.payload;
    },
    setDatabaseId(state, action) {
      state.databaseId = action.payload;
    },
    setEditingMovie(state, action) {
      state.editingMovie = action.payload;
    },
    setIsSearching(state, action) {
      state.isSearching = action.payload;
    },
    setIsEditing(state, action) {
      state.isEditing = action.payload;
    },
    setIsPending(state, action) {
      state.isPending = action.payload;
    },
    setIsNewMovieAdding(state, action) {
      state.isNewMovieAdding = action.payload;
    },
  },
});

export const {
  setMovies,
  setDatabaseId,
  setEditingMovie,
  setMovieSuggestion,
  setIsSearching,
  setIsEditing,
  setIsPending,
  setIsNewMovieAdding,
} = slice.actions;

export default slice.reducer;
