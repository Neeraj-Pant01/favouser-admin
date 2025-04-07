import { configureStore } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'

import storage from 'redux-persist/lib/storage'

import rootReducer from "./rootreducer";

const persistConfig = {
    key: 'favouser-admin',
    version:1,
    storage
}

const persisTedReducer = persistReducer(persistConfig, rootReducer)

  export const store = configureStore({
    reducer: persisTedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  })

  export let persistor = persistStore(store)