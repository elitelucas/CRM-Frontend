import * as requestFromServer from "./usersCrud";
import {usersSlice, callTypes} from "./usersSlice";

const {actions} = usersSlice;

export const fetchUsers = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findUsers(queryParams)
    .then(response => {
      const { totalCount, entities } = response.data;
      dispatch(actions.usersFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find users";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchUser = id => dispatch => {
  if (!id) {
    return dispatch(actions.userFetched({ userForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getUserById(id)
    .then(response => {
      const user = response.data;
      dispatch(actions.userFetched({ userForEdit: user }));
    })
    .catch(error => {
      error.clientMessage = "Can't find user";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteUser = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteUser(id)
    .then(response => {
      dispatch(actions.userDeleted({ id }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete user";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createUser = userForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createUser(userForCreation)
    .then(response => {
      const { user } = response.data;
      console.log(user);
      dispatch(actions.userCreated({ users:user }));
    })
    .catch(error => {
      error.clientMessage = "Can't create user";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateUser = users => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateUser(users)
    .then(() => {
      dispatch(actions.userUpdated({ users }));
    })
    .catch(error => {
      error.clientMessage = "Can't update user";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};



export const deleteUsers = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteUsers(ids)
    .then(() => {
      dispatch(actions.usersDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete users";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
