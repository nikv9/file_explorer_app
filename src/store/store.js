import { configureStore } from "@reduxjs/toolkit";
import fileExpSlice from "./file_exp/file_exp_store";

export const store = configureStore({
  reducer: {
    fileExp: fileExpSlice,
  },
});
