import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist';
import rootReducer from '../reducers';
const middleWares = [thunk];

const persistConfig = {
  key: 'admin',
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer, applyMiddleware(...middleWares))
let persistor = persistStore(store)
export default store;
export {persistor}