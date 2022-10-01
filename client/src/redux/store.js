import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import userReducer from "./userSlice";
import communityReducer from "./community/communitySlice";
import messageReducer from "./messageSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
// import { encryptTransform } from "redux-persist-transform-encrypt";

// const encrypt = encryptTransform({
//   secretKey: "nes-still-connecting-OKey",
//   onError: function (error) {
//     // Handle the error.
//     console.log("Encrypt died", error);
//   },
// });

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist:["auth"],
  // transforms: [encrypt],
};

const rootReducer = combineReducers({
  auth:authReducer,
  users: userReducer,
  communities: communityReducer,
  messages: messageReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
