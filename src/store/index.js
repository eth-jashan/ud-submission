import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./reducers/auth-slice"

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist"
import storage from "redux-persist/lib/storage"
import { combineReducers } from "redux"

const rootReducer = combineReducers({
    auth: authSlice.reducer,
})

const persistConfig = {
    key: "root",
    storage,
    blacklist: [
        "transaction",
        "dao",
        "gnosis",
        "contributor",
        "toast",
        "membership",
    ],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
})

export const persistor = persistStore(store)
export default store
