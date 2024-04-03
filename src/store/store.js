// store.js
import { createStore } from 'redux';
import rootReducer from './reducers'; // Anda perlu membuat file reducers.js

const store = createStore(rootReducer);

export default store;