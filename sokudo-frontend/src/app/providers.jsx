'use client';

import { Provider, useSelector, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { useEffect } from 'react';

import store, { persistor } from './store/Store';
import { setAuthToken } from './utils/Base';
import { hydrateUser } from './features/user/UserSlice';

function AuthInit() {
   const dispatch = useDispatch();
   const token = useSelector((state) => state.user.token);

   useEffect(() => {
      dispatch(hydrateUser());
   }, [dispatch]);

   useEffect(() => {
      if (token) {
         setAuthToken(token);
      }
   }, [token]);

   return null;
}

export function Providers({ children }) {
   return (
      <Provider store={store}>
         <PersistGate loading={null} persistor={persistor}>
            <AuthInit />
            {children}
         </PersistGate>
      </Provider>
   );
}
