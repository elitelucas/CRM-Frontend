import axios from "axios";

export const COUNTRIES_URL = process.env.REACT_APP_API_URL+"api/countries";

// CREATE =>  POST: add a new country to the server
export function createCountry(country) {
  return axios.post(COUNTRIES_URL, { country });
}

// READ
export function getAllCountries() {
  return axios.get(COUNTRIES_URL);
}

export function getCountryById(countryId) {
  return axios.get(`${COUNTRIES_URL}/${countryId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findCountries(queryParams) {
  return axios.post(`${COUNTRIES_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the country on the server
export function updateCountry(country) {
  return axios.put(`${COUNTRIES_URL}/${country.id}`, { country });
}

// UPDATE Status
export function updateStatusForCountries(ids, status) {
  return axios.post(`${COUNTRIES_URL}/updateStatusForCountries`, {
    ids,
    status
  });
}

// DELETE => delete the country from the server
export function deleteCountry(countryId) {
  return axios.delete(`${COUNTRIES_URL}/${countryId}`);
}

// DELETE Countries by ids
export function deleteCountries(ids) {
  return axios.post(`${COUNTRIES_URL}/deleteCountries`, { ids });
}
