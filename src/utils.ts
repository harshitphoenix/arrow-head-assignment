import { DebounceFunctionType } from "./types/Debounce";

export const movieMapper = (movie: any) => {
  return {
    id: movie.id,
    title: movie.title.title[0].text.content,
    isWatched: movie.isWatched.checkbox,
    watchedDate: movie.watchedDate.date.start,
    comment: movie.comment.rich_text[0].text.content,
    ratings: movie.ratings.select.name,
  };
};

export const debounce: DebounceFunctionType<() => void> = (fn, delay) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<() => void>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};
