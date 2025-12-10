import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
   persistStore,
   persistReducer,
   FLUSH,
   REHYDRATE,
   PAUSE,
   PERSIST,
   PURGE,
   REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import productReducer from '../features/products/ProductSlice';
import userReducer from '../features/user/UserSlice';
import blogReducer from '../features/blogs/BlogSlice';
import orderReducer from '../features/order/OrderSlice';
import testRideReducer from '../features/testRide/testRideSlice';

const rootReducer = combineReducers({
   product: productReducer,
   user: userReducer,
   blogs: blogReducer,
   order: orderReducer,
   testRide: testRideReducer,
});

const persistConfig = {
   key: 'root',
   storage,
   whitelist: ['user'],
};

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

export const persistor = persistStore(store);

export default store;
