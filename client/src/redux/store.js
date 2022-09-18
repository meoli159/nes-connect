import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import communityReducer from "./communitySlice";
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
import { encryptTransform } from "redux-persist-transform-encrypt";

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
  whitelist:[],
  // transforms: [encrypt],
};
const authConfig = {
  key: "auth",
  version: 1,
  storage,
  whitelist:['login'],
  // transforms: [encrypt],
};
const rootReducer = combineReducers({
  auth:persistReducer( authConfig,authReducer),
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
