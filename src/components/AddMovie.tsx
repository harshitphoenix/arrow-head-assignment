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
  Checkbox,
  RadioGroup,
  Radio,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  setIsEditing,
  setIsNewMovieAdding,
  setIsPending,
  setMovies,
} from "../redux/slice";
import { addMovie, movieUpdate } from "../helper/moviesHelper";
import { Movie } from "../types/Movie";

const AddMovieModal = () => {
  const [title, setTitle] = React.useState(
    useSelector((state: RootState) => state.appReducer.editingMovie?.title)
  );
  const [isWatched, setIsWatched] = React.useState(
    useSelector((state: RootState) => state.appReducer.editingMovie?.isWatched)
  );
  const [comment, setComment] = React.useState(
    useSelector((state: RootState) => state.appReducer.editingMovie?.comment)
  );
  const [rating, setRating] = React.useState(
    useSelector((state: RootState) => state.appReducer.editingMovie?.ratings)
  );
  const [date, setdate] = React.useState(
    useSelector(
      (state: RootState) => state.appReducer.editingMovie?.watchedDate
    )
  );
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.appReducer.isEditing);
  const movies = useSelector((state: RootState) => state.appReducer.movies);
  const currentTitle = useSelector(
    (state: RootState) => state.appReducer.editingMovie?.title
  );
  const currentComment = useSelector(
    (state: RootState) => state.appReducer.editingMovie?.comment
  );
  const currentRating = useSelector(
    (state: RootState) => state.appReducer.editingMovie?.ratings
  );
  const currentisWatched = useSelector(
    (state: RootState) => state.appReducer.editingMovie?.isWatched
  );
  const currentDate = useSelector(
    (state: RootState) => state.appReducer.editingMovie?.watchedDate
  );
  const isNewMovieAdding = useSelector(
    (state: RootState) => state.appReducer.isNewMovieAdding
  );

  const setModalClose = () => {
    dispatch(setIsEditing(false));
  };

  const handleNewMovieSubmit = async () => {
    dispatch(setIsPending(true));
    let newMovie: Movie = {
      id: "",
      title: (title as string) || "No Title",
      comment: comment as string,
      ratings: rating as string,
      isWatched: isWatched as boolean,
      watchedDate: date as string,
    };
    const res = await addMovie(newMovie);
    dispatch(setMovies([...movies, res]));
    dispatch(setIsEditing(false));
    dispatch(setIsPending(false));
    dispatch(setIsNewMovieAdding(false));
  };

  const handleMovieUpdateSubmit = async () => {
    dispatch(setIsPending(true));
    
    let newMovie: Movie = {
      id: "",
      title: (title as string) || "No Title",
      comment: comment as string,
      ratings: rating as string,
      isWatched: isWatched as boolean,
      watchedDate: date as string,
    };
    const res = await movieUpdate(newMovie);
    dispatch(setMovies([...movies, res]));//change this
    dispatch(setIsEditing(false));
    dispatch(setIsPending(false));
    dispatch(setIsNewMovieAdding(false));
  };

  useEffect(() => {
    setTitle(currentTitle);
    setComment(currentComment);
    setRating(currentRating);
    setIsWatched(currentisWatched);
    setdate(currentDate);
  }, [isOpen]);

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
        <ModalHeader> {isNewMovieAdding ? "Add" : "Update"} Movie</ModalHeader>

        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={5}>
            <Input
              size='lg'
              placeholder='Enter Name'
              placeContent={"center"}
              style={{
                height: "50px",
                borderRadius: "10px",
                fontSize: "20px",
              }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              size='lg'
              placeholder='Enter Comment'
              placeContent={"center"}
              style={{
                height: "50px",
                borderRadius: "10px",
                fontSize: "20px",
              }}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Box style={{ display: "flex", alignItems: "center" }}>
              <Text
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "black",
                  marginRight: "1rem",
                }}
              >
                Watched
              </Text>
              <Checkbox
                size='lg'
                style={{
                  height: "50px",
                  borderRadius: "10px",
                  fontSize: "20px",
                }}
                isChecked={isWatched}
                checked={isWatched}
                onChange={(e) => {
                  setIsWatched(e.target.checked);
                }}
              />
            </Box>
            {isWatched && (
              <Input
                size='lg'
                placeholder='Enter Watched Time'
                placeContent={"center"}
                style={{
                  height: "50px",
                  borderRadius: "10px",
                  fontSize: "20px",
                }}
                type='date'
                value={date}
                onChange={(e) => setdate(e.target.value)}
              />
            )}

            <RadioGroup value={rating} onChange={setRating}>
              <Stack direction='row'>
                <Text
                  style={{
                    borderRadius: "10px",
                    fontSize: "20px",
                  }}
                >
                  Ratings:{" "}
                </Text>
                <Radio value='5'>5</Radio>
                <Radio value='4'>4</Radio>
                <Radio value='3'>3</Radio>
                <Radio value='2'>2</Radio>
                <Radio value='1'>1</Radio>
              </Stack>
            </RadioGroup>
          </Stack>
          <ModalFooter>
            {isNewMovieAdding ? (
              <Button disabled onClick={handleNewMovieSubmit}>
                + Add
              </Button>
            ) : (
              <Button disabled onClick={handleMovieUpdateSubmit}>
                Update
              </Button>
            )}
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddMovieModal;
