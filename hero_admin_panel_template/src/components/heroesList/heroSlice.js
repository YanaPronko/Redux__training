import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { useHttp } from "../../hooks/http.hook";

// const initialState = {
//   heroes: [],
//   heroesLoadingStatus: "idle",
// };

// Функция createEntityAdapter может принимать в себя колбэки, которые
// переопределяют уже встроенные в него(допустим мы хотим получать id из структуры
// которая не подходи под ту, что встроена и т.д.)
const heroesAdapter = createEntityAdapter();
const initialState = heroesAdapter.getInitialState({
  heroesLoadingStatus: "idle"
});

export const fetchHeroes = createAsyncThunk(
  'heroes/fetchHeroes',
  // аргументы, которая принимает эта функция????
  () => {
    const { request } = useHttp();
    // createAsyncThunk вызвращает фактически 3 creators: pending, fullfilled, rejected?
    // обязательно надо ставить return
    // обработка результатов этого createAsyncThunk - обрабатывается  в extrareducers
    return request("http://localhost:3001/heroes");
  }
)

const heroesSlice = createSlice({
  name: "heroes",
  initialState,
  reducers: {
    // heroesFetching: state => { state.heroesLoadingStatus = 'loading'; },
    // heroesFetched: (state, action) => {
    //   state.heroesLoadingStatus = 'idle';
    //   state.heroes = action.payload;
    // },
    // heroesFetchingError: (state) => { state.heroesLoadingStatus = 'error'; },
    heroesCreated: (state, action) => {
      // state.heroes.push(action.payload)
      heroesAdapter.addOne(state, action.payload);
    },
    heroesDeleted: (state, action) => {
      // state.heroes.filter(item => item.id !== action.payload);
      heroesAdapter.removeOne(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroes.pending, (state) => {
        state.heroesLoadingStatus = "loading";
      })
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        state.heroesLoadingStatus = "idle";
        heroesAdapter.setAll(state, action.payload);
      })
      .addCase(fetchHeroes.rejected, (state) => {
        state.heroesLoadingStatus = "error";
      })
      .addDefaultCase(() => { });
  }
});

const { selectAll } = heroesAdapter.getSelectors((state) => state.heroes);

export const filteredHeroesSelector = createSelector(
  (state) => state.filters.activeFilter,
  // (state) => state.heroesReducer.heroes,
  // здесь selectAll получает state автоматически, за счет того, что используется внутри createSelector
  // а селекторы - это функции, которые получают стейт
  // но если использовать ее отдельно, то ей нужно передвать state т.к. сигнатрура
  // selectAll(state=> state.smth) стейт нужно откуда получить

  selectAll,
  (activeFilter, heroes) => {
    if (activeFilter === "all") {
      console.log("render");
      console.log(heroes);
      return heroes;
    } else {
      return heroes.filter((item) => item.element === activeFilter);
    }
  }
);


const { actions, reducer } = heroesSlice;

export default reducer;
export const { heroesFetching, heroesFetched, heroesFetchingError, heroesCreated, heroesDeleted } = actions;