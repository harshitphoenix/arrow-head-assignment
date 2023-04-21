import React, { useEffect } from "react";
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Input,
  Stack,
} from "@chakra-ui/react";
import { MovieSuggestion } from "../types/MoviesSuggestion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { fetchMovieSugestions } from "../helper/moviesHelper";
import {
  setEditingMovie,
  setIsEditing,
  setIsNewMovieAdding,
  setIsSearching,
} from "../redux/slice";
import { Movie } from "../types/Movie";

const MoviesSearchModal = () => {
  const [searchValue, setSearchValue] = React.useState("");
  const [suggestions, setSuggestions] = React.useState<any[]>([]);

  const dispatch = useDispatch();
  const isOpen = useSelector(
    (state: RootState) => state.appReducer.isSearching
  );

  const setModalClose = () => {
    dispatch(setIsSearching(false));
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
    if (value.length > 4) {
      fetchMovieSugestions(value).then((res: any) => {
        setSuggestions(res.Search);
      });
    }
  };

  const handleSelectedMovie = async (movie: any) => {
    const newMovie: Movie = {
      id: "",
      title: movie.Title,
      comment: "",
      ratings: "0",
      isWatched: false,
      watchedDate: "",
    };
    dispatch(setEditingMovie(newMovie));
    dispatch(setIsSearching(false));
    setSearchValue("");
    setSuggestions([]);
    dispatch(setIsNewMovieAdding(true));
    dispatch(setIsEditing(true));
  };

  return (
    <Modal isOpen={isOpen} onClose={setModalClose}>
      <ModalOverlay
        style={{
          height: "100vh",
        }}
      />
      <ModalContent
        style={{
          width: "60vw",
          padding: "20px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
        }}
      >
        <ModalHeader>Popular Movies</ModalHeader>

        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={5}>
            <Input
              size='lg'
              placeholder='Search for movies'
              placeContent={"center"}
              style={{
                height: "50px",
                borderRadius: "10px",
                fontSize: "20px",
              }}
              value={searchValue}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <Stack
              spacing={5}
              style={{
                overflowY: "auto",
                height: "60vh",
              }}
            >
              {suggestions && suggestions.length > 0 ? (
                suggestions.map((movie) => (
                  <Box
                    onClick={() => handleSelectedMovie(movie)}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "10px",
                      borderRadius: "10px",
                      backgroundColor: "white",
                      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
                      cursor: "pointer",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        color: "#000000",
                      }}
                    >
                      {movie.Title}
                    </Text>
                    <Text
                      style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        color: "#000000",
                      }}
                    >
                      {movie.Year}
                    </Text>
                  </Box>
                ))
              ) : (
                <Box>
                  <Text
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "#aaaaaa",
                    }}
                  >
                    No Suggestions
                  </Text>
                </Box>
              )}
            </Stack>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default MoviesSearchModal;
