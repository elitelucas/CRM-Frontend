import React, {createContext, useContext, useState, useCallback} from "react";
import {isEqual, isFunction} from "lodash";
import {initialFilter} from "./DepartmentsUIHelpers";

const DepartmentsUIContext = createContext();

export function useDepartmentsUIContext() {
  return useContext(DepartmentsUIContext);
}

export const DepartmentsUIConsumer = DepartmentsUIContext.Consumer;

export function DepartmentsUIProvider({departmentsUIEvents, children}) {
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
  const [ids, setIds] = useState([]);
  const setQueryParams = useCallback(nextQueryParams => {
    setQueryParamsBase(prevQueryParams => {
      if (isFunction(nextQueryParams)) {
        nextQueryParams = nextQueryParams(prevQueryParams);
      }

      if (isEqual(prevQueryParams, nextQueryParams)) {
        return prevQueryParams;
      }

      return nextQueryParams;
    });
  }, []);

  const initDepartment = {
    id: undefined,
    name: "",    
    type: 0
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initDepartment,
    newDepartmentButtonClick: departmentsUIEvents.newDepartmentButtonClick,
    openEditDepartmentDialog: departmentsUIEvents.openEditDepartmentDialog,
    openDeleteDepartmentDialog: departmentsUIEvents.openDeleteDepartmentDialog,
    openDeleteDepartmentsDialog: departmentsUIEvents.openDeleteDepartmentsDialog   
  };

  return <DepartmentsUIContext.Provider value={value}>{children}</DepartmentsUIContext.Provider>;
}