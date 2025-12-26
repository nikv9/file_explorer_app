import { configureStore } from "@reduxjs/toolkit";
import fileExpSlice from "./file_exp/file_exp_store.ts";

export const store = configureStore({
  reducer: {
    fileExp: fileExpSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;