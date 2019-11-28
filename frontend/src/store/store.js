import React, { createContext, useContext, useReducer } from 'react';
import { messageReducer, messageInitialState } from './message';
import { authReducer, authInitialState } from './auth';
import { mapReducer, mapInitialState } from './map';

/**
 * React context for store
 */
const StoreContext = createContext();

/**
 * Combine initial states
 */
const store = {
  message: messageInitialState,
  auth: authInitialState,
  map: mapInitialState
};

/**
 * Combine reducers
 */
const reducers = (store, action) => ({
  message: messageReducer(store.message, action),
  auth: authReducer(store.auth, action),
  map: mapReducer
});

/**
 * Store context provider
 */
export const StoreProvider = ({ children }) => (
  <StoreContext.Provider value={useReducer(reducers, store)}>
    {children}
  </StoreContext.Provider>
);

/**
 * React hook for consuming store
 */
export const useStore = () => useContext(StoreContext);
