import React from 'react'
import ReactDOM from 'react-dom/client'
import { legacy_createStore as createStore, bindActionCreators } from "redux";
import { Provider } from 'react-redux';

import reducer from "./reducer";
// import * as actions from "./actions";
// import Counter from './components/Counter';

import './index.css'
import App from './components/App';

console.log("REDUX")
// const initialState = { value: 0 };

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "INC":
//       return {
//         ...state,
//         value: state.value + 1,
//       };
//     case "DEC":
//       return {
//         ...state,
//         value: state.value - 1,
//       };
//     case "RND":
//       return {
//         ...state,
//         value: state.value * action.payload,
//       };
//     default:
//       return state;
//   }
// };

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// const { dispatch, subscribe, getState } = store;

// const update = () => {
//   document.getElementById("counter").textContent = store.getState().value;
// };
// const update = () => {
//   // document.getElementById("counter").textContent = getState().value;
//   ReactDOM.createRoot(document.getElementById("root")).render(
//     <React.StrictMode>
//       {/* <Counter
//         counter={getState().value}
//         inc={inc}
//         dec={dec}
//         rnd={() => {
//           const value = Math.floor(Math.random() * 10);
//           rnd(value);
//         }}
//       /> */}
//       <Provider store={store}>
//         <App />
//       </Provider>
//     </React.StrictMode>
//   );

// };

// store.subscribe(update);
// update();
// subscribe(update);


// const inc = () => ({ type: "INC" });
// const dec = () => ({ type: "DEC" });
// const rnd = (value) => ({ type: "RND", payload: value });

// Заменяем конструкцию которая выше, на то, что ниже: для упрощения использования ???
// const bindActionCreator = (creator, dispatch) => (...args) => {
//     dispatch(creator(...args));
// }

// const decDispatch = bindActionCreator(dec, dispatch);
// const incDispatch = bindActionCreator(inc, dispatch);
// const rndDispatch = bindActionCreator(rnd, dispatch);


// Actions - это объект, который импортнули из './actions" , оттуда в деструктурируеум
// наши функции - creators
// const { inc, dec, rnd } = bindActionCreators(actions, dispatch);

// document.getElementById("inc").addEventListener("click", inc);
// document.getElementById("dec").addEventListener("click", dec);
// document.getElementById("rnd").addEventListener("click", () => {
//   const value = Math.floor(Math.random() * 10);
//   rnd(value);
// });


// document.getElementById("inc").addEventListener("click", () => {
//   // store.dispatch(inc());
//   dispatch(inc());
// });
// document.getElementById("inc").addEventListener("click", incDispatch);

// document.getElementById("dec").addEventListener("click", () => {
//   // store.dispatch(dec());
//   dispatch(dec());
// });

// document.getElementById("rnd").addEventListener("click", () => {
//   const value = Math.floor(Math.random() * 10);
//   // store.dispatch(rnd(value));
//   // dispatch(rnd(value));
//   // rndDispatch(value);
// });


// let state = reducer(initialState, {type: 'INC'});
// state = reducer(state, {type: 'INC'});
// state = reducer(state, {type: 'INC'});
// state = reducer(state, {type: 'INC'});
// console.log(state);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );