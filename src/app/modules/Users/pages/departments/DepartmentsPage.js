import React from "react";
import { Route } from "react-router-dom";
import { DepartmentsLoadingDialog } from "./departments-loading-dialog/DepartmentsLoadingDialog";
import { DepartmentEditDialog } from "./department-edit-dialog/DepartmentEditDialog";
import { DepartmentDeleteDialog } from "./department-delete-dialog/DepartmentDeleteDialog";
import { DepartmentsDeleteDialog } from "./departments-delete-dialog/DepartmentsDeleteDialog";
import { DepartmentsUIProvider } from "./DepartmentsUIContext";
import { DepartmentsCard } from "./DepartmentsCard";

export function DepartmentsPage({ history }) {
  const departmentsUIEvents = {
    newDepartmentButtonClick: () => {
      history.push("/users/departments/new");
    },
    openEditDepartmentDialog: (id) => {
      history.push(`/users/departments/${id}/edit`);
    },
    openDeleteDepartmentDialog: (id) => {
      history.push(`/users/departments/${id}/delete`);
    },
    openDeleteDepartmentsDialog: () => {
      history.push(`/users/departments/deleteDepartments`);
    },
    openFetchDepartmentsDialog: () => {
      history.push(`/users/departments/fetch`);
    },
    openUpdateDepartmentsStatusDialog: () => {
      history.push("/users/departments/updateStatus");
    }
  }

  return (
    <DepartmentsUIProvider departmentsUIEvents={departmentsUIEvents}>
      <DepartmentsLoadingDialog />
      <Route path="/users/departments/new">
        {({ history, match }) => (
          <DepartmentEditDialog
            show={match != null}
            onHide={() => {
              history.push("/users/departments");
            }}
          />
        )}
      </Route>
      <Route path="/users/departments/:id/edit">
        {({ history, match }) => (
          <DepartmentEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/users/departments");
            }}
          />
        )}
      </Route>
      <Route path="/users/departments/deleteDepartments">
        {({ history, match }) => (
          <DepartmentsDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/users/departments");
            }}
          />
        )}
      </Route>
      <Route path="/users/departments/:id/delete">
        {({ history, match }) => (
          <DepartmentDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/users/departments");
            }}
          />
        )}
      </Route>
     
      <DepartmentsCard />
    </DepartmentsUIProvider>
  );
}
