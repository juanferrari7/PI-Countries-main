import axios from "axios";
export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const SEARCH_COUNTRIES = "SEARCH_COUNTRIES";
export const SORT_COUNTRIES = "SORT_COUNTRIES";
export const FILTER_BY_CONTINENT = "FILTER_BY_CONTINENT";
export const FILTER_BY_ACTIVITY = "FILTER_BY_ACTIVITY";
export const POST_ACTIVTIY = "POST_ACTIVTIY";

export function getCountries() {
  return function (dispatch) {
    axios
      .get(`http://localhost:3001/countries`)
      .then((countries) => {
        dispatch({
          type: GET_COUNTRIES,
          payload: countries.data,
        });
      })
      .catch((error) => console.log(error));
  };
}

export function getActivities() {
  return function (dispatch) {
    axios
      .get(`http://localhost:3001/activities`)
      .then((activities) => {
        dispatch({
          type: GET_ACTIVITIES,
          payload: activities.data,
        });
      })
      .catch((error) => console.log(error));
  };
}

export function searchCountries(name) {
  return function (dispatch) {
    axios
      .get(`http://localhost:3001/countries?name=${name}`)
      .then((countries) => {
        dispatch({
          type: SEARCH_COUNTRIES,
          payload: countries.data,
        });
      })
      .catch((error) => console.log(error));
  };
}

export function sortCountries(payload) {
  return {
    type: SORT_COUNTRIES,
    payload,
  };
}

export function filterByContinent(payload) {
  return {
    type: FILTER_BY_CONTINENT,
    payload,
  };
}

export function filterByActivity(payload) {
  return {
    type: FILTER_BY_ACTIVITY,
    payload,
  };
}

export function postActivity(payload) {
  return function (dispatch) {
    axios
      .post(`http://localhost:3001/activities`, payload)
      .then((res) => {
        return res;
      })
      .catch((error) => console.log(error));
  };
}
