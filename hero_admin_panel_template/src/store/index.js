// import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
// import ReduxThunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';

// import reducer from '../reducers';
// import heroesReducer from '../reducers/heroes';
// import filtersReducer from '../reducers/filters';

import heroes from '../components/heroesList/heroSlice';
import filters from '../components/heroesFilters/filtersSlice';



const stringMiddleware = () => (next) => (action) => {
  if(typeof action === "string") {
    return next({
      type: action,
    });
  }
  return next(action);
}

// const enhancer =
//   (createStore) =>
//   (...args) => {
//     const store = createStore(...args);

//     const oldDispatch = store.dispatch;
//     store.dispatch = (action) => {
//       if (typeof action === "string") {
//         return oldDispatch({
//           type: action,
//         });
//       }
//       return oldDispatch(action);
//     };
//     return store;
//   };

const store = configureStore({
  reducer: { heroes, filters },
  //  getDefaultMiddlware возвращает 3 дефолтных middleware(1 - проверяет store на наличие того,
  // там не должно быть по типам(промисы, таймеры и тд)
  // 2 - проверяет store на иммутабельность, 3-й - это redux-thunk)
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});

//  const store = createStore(combineReducers({ heroesReducer, filtersReducer }), compose(applyMiddleware(ReduxThunk, stringMiddleware),
//    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

// const store = createStore(combineReducers({ heroesReducer, filtersReducer }), compose(applyMiddleware(stringMiddleware),
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

// const store = createStore(
//   combineReducers({ heroesReducer, filtersReducer }),
//   compose(
//     enhancer,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// );
// const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
// const store = createStore(combineReducers({ heroesReducer, filtersReducer }),
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export default store;