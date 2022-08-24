import {
  FILTER_BY_ACTIVITY,
  FILTER_BY_CONTINENT,
  GET_ACTIVITIES,
  GET_COUNTRIES,
  POST_ACTIVTIY,
  SEARCH_COUNTRIES,
  SORT_COUNTRIES,
} from "../actions";

const initialState = {
  allCountries: [],
  countries: [],
  activities: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        allCountries: action.payload,
        countries: action.payload,
      };

    case GET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
      };

    case POST_ACTIVTIY:
      return {
        ...state,
      };

    case SEARCH_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
      };

    case FILTER_BY_CONTINENT:
      const allCountries = [...state.allCountries];
      let filteredCountries =
        action.payload === "All"
          ? allCountries
          : allCountries.filter((el) => el.continents.includes(action.payload));
      return {
        ...state,
        countries: filteredCountries,
      };

    case FILTER_BY_ACTIVITY:
      let countries = [...state.countries];

      let filterActivity = countries.filter((el) =>
        el.Activities.includes(action.payload)
      );
      return {
        ...state,
        countries: filterActivity,
      };

    case SORT_COUNTRIES:
      let order = [...state.countries];
      order.sort((a, b) => {
        switch (action.payload) {
          case "+POPULATION":
            return b.population - a.population;
          case "-POPULATION":
            return a.population - b.population;
          case "ASCENDENTE":
            if (a.name < b.name) return -1;
            break;
          case "DESCENDENTE":
            if (a.name > b.name) return -1;
            break;
          default:
            return 1;
        }
        return order;
      });
      return {
        ...state,
        countries: order,
      };

    default:
      return state;
  }
}
