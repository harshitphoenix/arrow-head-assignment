import {
  Button,
  Table,
  TableContainer,
  Thead,
  Tooltip,
  Tr,
  Th,
  Tbody,
  Td,
  Text,
  RadioGroup,
  Radio,
  Stack,
  Box,
  Modal,
  Spinner,
  ModalOverlay,
  ModalContent,
  ModalBody,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setEditingMovie,
  setIsEditing,
  setIsPending,
  setIsSearching,
  setMovies,
} from "../redux/slice";
import { fetchMovies } from "../helper/moviesHelper";
import { RootState } from "../redux/store";
import { AddIcon, EditIcon } from "@chakra-ui/icons";
import { Movie } from "../types/Movie";

const ItemRow = () => {
  const [filter, setFilter] = React.useState("all");
  const dispatch = useDispatch();

  const movies = useSelector((state: RootState) => state.appReducer.movies);
  const isPending = useSelector(
    (state: RootState) => state.appReducer.isPending
  );
  
  const handleSearchModalOpen = () => {
    dispatch(setIsSearching(true));
  };

  useEffect(() => {
    fetchMovies("undefined").then((res: any) => {
      dispatch(setMovies(res));
      dispatch(setIsPending(false));
    });
  }, []);

  const handleFilterChange = (value: string) => {
    dispatch(setIsPending(true));
    setFilter(value);
    fetchMovies(value).then((res: any) => {
      dispatch(setMovies(res));
      dispatch(setIsPending(false));
    });
  };

  const handleEditClick = (movie: Movie) => {
    dispatch(setIsEditing(true));
    dispatch(setEditingMovie(movie));
  };
  return (
    <>
      <Modal isOpen={isPending as boolean} onClose={() => null}>
        <ModalOverlay
          style={{
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
        <ModalContent
          style={{
            backgroundColor: "transparent",
            opacity: "0",
            justifyContent: "center",
            alignItems: "center",
            width: "100",
          }}
        >
          <ModalBody>
            <Spinner
              thickness='5px'
              speed='0.65s'
              emptyColor='gray.200'
              color='blue.500'
              size='xl'
            />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Stack direction={"row"} placeItems='center'>
        <Tooltip label='Add Movie' aria-label='A tooltip'>
          <Button onClick={handleSearchModalOpen}>+{" "}Add Movie</Button>
        </Tooltip>
        <Box>
          <Text>Show</Text>
        </Box>

        <RadioGroup
          value={filter}
          onChange={(e) => handleFilterChange(e)}
          flexDirection={"row"}
        >
          <Radio value='all'>All</Radio>
          <Radio value='watched'>Watched</Radio>
          <Radio value='notWatched'>Not Watched</Radio>
        </RadioGroup>
      </Stack>

      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Ratings</Th>
              <Th>Watched</Th>
              <Th>Date Watched</Th>
              <Th>Comment</Th>
            </Tr>
          </Thead>

          {movies.length === 0 ? (
            <div>Loading...</div>
          ) : (
            <Tbody>
              {movies != null &&
                movies.map((movie) => (
                  <Tr>
                    <Td>{movie.title}</Td>
                    <Td>{movie.ratings}</Td>
                    <Td>{movie.isWatched ? "Yes" : "No"}</Td>
                    <Td>{movie.watchedDate}</Td>
                    <Td>{movie.comment}</Td>
                    <Td>
                      <EditIcon onClick={() => handleEditClick(movie)} />
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          )}
        </Table>
      </TableContainer>
      <Button>Next 10</Button>
    </>
  );
};

export default ItemRow;
