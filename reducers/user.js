import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { likedMovies: [], watchCount: [], personalNote: [] },
};

export const nomDuReducerSlice = createSlice({
  name: "user",

  initialState,
  reducers: {
    updatelikedMovies: (state, action) => {
      if (state.value.likedMovies.some((movie) => movie === action.payload)) {
        state.value.likedMovies = state.value.likedMovies.filter(
          (element) => element !== action.payload
        );
      } else {
        state.value.likedMovies.push(action.payload);
      }
    },
    watchMovie: (state, action) => {
      if (
        state.value.watchCount.find(
          (element) => element.title === action.payload
        )
      ) {
        state.value.watchCount = state.value.watchCount.map((element) =>
          element.title === action.payload
            ? { ...element, count: element.count + 1 }
            : element
        );
      } else {
        state.value.watchCount.push({ title: action.payload, count: 1 });
      }
    },
    updateNote: (state, action) => {
      if (
        state.value.personalNote.find(
          (element) => element.title === action.payload.movieTitle
        )
      ) {
        state.value.personalNote = state.value.personalNote.map((element) =>
          element.title === action.payload.movieTitle
            ? { ...element, count: action.payload.count }
            : element
        );
      } else {
        state.value.personalNote.push({
          title: action.payload.movieTitle,
          count: action.payload.count,
        });
      }
    },
  },
});

export const { updatelikedMovies, watchMovie, updateNote } =
  nomDuReducerSlice.actions;
export default nomDuReducerSlice.reducer;
