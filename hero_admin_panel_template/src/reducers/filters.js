const initialState = {
  filters: [],
  filtersLoadingStatus: "idle",
  activeFilter: "all",
  // filteredHeroes: [],
};

const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FILTERS_FETCHING":
      return {
        ...state,
        filtersLoadingStatus: "loading",
      };
    case "FILTERS_FETCHED":
      return {
        ...state,
        filters: action.payload,
        filtersLoadingStatus: "idle",
      };
    case "FILTERS_FETCHING_ERROR":
      return {
        ...state,
        filtersLoadingStatus: "error",
      };
    case "ACTIVE_FILTER_CHANGED":
      return {
        ...state,
        activeFilter: action.payload,
        // filteredHeroes:
        //   action.payload === "all"
        //     ? state.heroes
        //     : state.heroes.filter((item) => item.element === action.payload),
      };
    // Самая сложная часть - это показывать новые элементы по фильтрам
    // при создании или удалении
    default:
      return state;
  }
};

export default filtersReducer;
