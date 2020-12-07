import axios from "axios";

export const DEPARTMENTS_URL = process.env.REACT_APP_API_URL+"api/departments";

// CREATE =>  POST: add a new department to the server
export function createDepartment(department) {
  return axios.post(DEPARTMENTS_URL, { department });
}

// READ
export function getAllDepartments() {
  return axios.get(DEPARTMENTS_URL);
}

export function getDepartmentById(departmentId) {
  return axios.get(`${DEPARTMENTS_URL}/${departmentId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findDepartments(queryParams) {
  return axios.post(`${DEPARTMENTS_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the department on the server
export function updateDepartment(department) {
  return axios.put(`${DEPARTMENTS_URL}/${department.id}`, { department });
}



// DELETE => delete the department from the server
export function deleteDepartment(departmentId) {
  return axios.delete(`${DEPARTMENTS_URL}/${departmentId}`);
}

// DELETE Departments by ids
export function deleteDepartments(ids) {
  return axios.post(`${DEPARTMENTS_URL}/deleteDepartments`, { ids });
}
