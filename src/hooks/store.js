import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./app-slice";
import chatSlice from "./chat-slice";
import searchSlice from "./search-slice";

const store = configureStore({
  reducer: {
    app: appSlice,
    search: searchSlice,
    chat: chatSlice,
  },
});

export default store;
