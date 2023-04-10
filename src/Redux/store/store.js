import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import { AuthUser } from '../reducers/authReducer';


const persistConfig = {
    key: 'counter',
    storage,
};

const reducers = combineReducers({ usuario: AuthUser });

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});