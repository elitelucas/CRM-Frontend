import axios from "axios";

export const USERS_URL = process.env.REACT_APP_API_URL+"api/users";

// CREATE =>  POST: add a new User to the server
export function createUser(user) {
  return axios.post(USERS_URL, { user });
}

// READ
export function getAllUsers() {
  return axios.get(USERS_URL);
}

export function getUserById(userId) {
  return axios.get(`${USERS_URL}/${userId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findUsers(queryParams) {
  return axios.post(`${USERS_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the user on the server
export function updateUser(user) {
  return axios.put(`${USERS_URL}/${user.id}`, { user });
}



// DELETE => delete the user from the server
export function deleteUser(userId) {
  return axios.delete(`${USERS_URL}/${userId}`);
}

// DELETE Users by ids
export function deleteUsers(ids) {
  return axios.post(`${USERS_URL}/deleteUsers`, { ids });
}
