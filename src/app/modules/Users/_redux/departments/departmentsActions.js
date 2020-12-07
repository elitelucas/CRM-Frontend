import * as requestFromServer from "./departmentsCrud";
import {departmentsSlice, callTypes} from "./departmentsSlice";

const {actions} = departmentsSlice;

export const fetchAllDepartments = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllDepartments()
    .then(response => {
      const { totalCount, entities } = response.data;
      dispatch(actions.departmentsFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find departments";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchDepartments = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findDepartments(queryParams)
    .then(response => {
      const { totalCount, entities } = response.data;
      dispatch(actions.departmentsFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find departments";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchDepartment = id => dispatch => {
  if (!id) {
    return dispatch(actions.departmentFetched({ departmentForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getDepartmentById(id)
    .then(response => {
      const department = response.data;
      dispatch(actions.departmentFetched({ departmentForEdit: department }));
    })
    .catch(error => {
      error.clientMessage = "Can't find department";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteDepartment = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteDepartment(id)
    .then(response => {
      dispatch(actions.departmentDeleted({ id }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete department";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createDepartment = departmentForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createDepartment(departmentForCreation)
    .then(response => {
      const { department } = response.data;
      console.log(department);
      dispatch(actions.departmentCreated({ departments:department }));
    })
    .catch(error => {
      error.clientMessage = "Can't create department";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateDepartment = departments => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateDepartment(departments)
    .then(() => {
      dispatch(actions.departmentUpdated({ departments }));
    })
    .catch(error => {
      error.clientMessage = "Can't update department";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};



export const deleteDepartments = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteDepartments(ids)
    .then(() => {
      dispatch(actions.departmentsDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete departments";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
