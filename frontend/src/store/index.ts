import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  REGISTER,
  REHYDRATE,
  FLUSH,
  PAUSE,
  PURGE,
  PERSIST,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import cartSlice from './cartSlice';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { productsApi } from './api';

const rootReducer = combineReducers({
  cart: cartSlice,
  // api...******************
  [productsApi.reducerPath]: productsApi.reducer,
});
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['cart'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [REGISTER, REHYDRATE, FLUSH, PAUSE, PURGE, PERSIST],
      },
    }).concat(productsApi.middleware),
});

// export types and & typed useSelector/useDispatch

export const persistor = persistStore(store);

// typed dispatch/selector
export type AppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// export hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;
