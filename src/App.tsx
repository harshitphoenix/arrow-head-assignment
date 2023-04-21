import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import ItemRow from "./components/ItemRow";
import MoviesSearchModal from "./components/MoviesSearchModal";
import { fetchMovies, fetchMovieSugestions } from "./helper/moviesHelper";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import {
  Button,
  ChakraBaseProvider,
  Modal,
  Spinner,
  Tooltip,
} from "@chakra-ui/react";
import chakraTheme from "@chakra-ui/theme";
import AddMovieModal from "./components/AddMovie";
import { setIsSearching } from "./redux/slice";
function App() {
  return (
    <Provider store={store}>
      <ChakraBaseProvider theme={chakraTheme}>
        
        <ItemRow />
        <MoviesSearchModal />
        <AddMovieModal />
      </ChakraBaseProvider>
    </Provider>
  );
}

export default App;
