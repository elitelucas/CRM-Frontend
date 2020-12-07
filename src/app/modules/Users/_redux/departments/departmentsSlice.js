import {createSlice} from "@reduxjs/toolkit";

const initialDepartmentsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  departmentForEdit: undefined,
  lastError: null
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const departmentsSlice = createSlice({
  name: "departments",
  initialState: initialDepartmentsState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
      } else {
        state.actionsLoading = false;
      }
    },
    startCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
      }
    },
    // getDepartmentById
    departmentFetched: (state, action) => {
      state.actionsLoading = false;
      state.departmentForEdit = action.payload.departmentForEdit;
      state.error = null;
    },
    // findDepartments
    departmentsFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createDepartment
    departmentCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      console.log(action.payload.departments);
      state.entities.push(action.payload.departments);
    },
    // updateDepartment
    departmentUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.id === action.payload.departments.id) {
          let tmp=action.payload.departments;
          tmp.no=entity.no;
          return tmp;
        }
        return entity;
      });
    },
    // deleteDepartment
    departmentDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.id !== action.payload.id);
    },
    // deleteDepartments
    departmentsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.id)
      );
    },
    // departmentsUpdateState
    departmentsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map(entity => {
        if (ids.findIndex(id => id === entity.id) > -1) {
          entity.status = status;
        }
        return entity;
      });
    }
  }
});
