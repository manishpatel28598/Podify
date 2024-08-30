import { configureStore } from "@reduxjs/toolkit";
import podcastReducer from "./slices/PodcastSlice";
import userReducer from "./slices/userSlice";
// import podcastReducer from "./slices/podcastSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    podcasts: podcastReducer,
  },
});