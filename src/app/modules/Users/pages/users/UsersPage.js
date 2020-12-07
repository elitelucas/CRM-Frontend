import React from "react";
import { Route } from "react-router-dom";
import { UsersLoadingDialog } from "./users-loading-dialog/UsersLoadingDialog";
import { UserEditDialog } from "./user-edit-dialog/UserEditDialog";
import { UserDeleteDialog } from "./user-delete-dialog/UserDeleteDialog";
import { UsersDeleteDialog } from "./users-delete-dialog/UsersDeleteDialog";
import { UsersUIProvider } from "./UsersUIContext";
import { UsersCard } from "./UsersCard";

export function UsersPage({ history }) {
  const usersUIEvents = {
    newUserButtonClick: () => {
      history.push("/users/users/new");
    },
    openEditUserDialog: (id) => {
      history.push(`/users/users/${id}/edit`);
    },
    openDeleteUserDialog: (id) => {
      history.push(`/users/users/${id}/delete`);
    },
    openDeleteUsersDialog: () => {
      history.push(`/users/users/deleteUsers`);
    },
    openFetchUsersDialog: () => {
      history.push(`/users/users/fetch`);
    },
    openUpdateUsersStatusDialog: () => {
      history.push("/users/users/updateStatus");
    }
  }

  return (
    <UsersUIProvider usersUIEvents={usersUIEvents}>
      <UsersLoadingDialog />
      <Route path="/users/users/new">
        {({ history, match }) => (
          <UserEditDialog
            show={match != null}
            onHide={() => {
              history.push("/users/users");
            }}
          />
        )}
      </Route>
      <Route path="/users/users/:id/edit">
        {({ history, match }) => (
          <UserEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/users/users");
            }}
          />
        )}
      </Route>
      <Route path="/users/users/deleteUsers">
        {({ history, match }) => (
          <UsersDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/users/users");
            }}
          />
        )}
      </Route>
      <Route path="/users/users/:id/delete">
        {({ history, match }) => (
          <UserDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/users/users");
            }}
          />
        )}
      </Route>
     
      <UsersCard />
    </UsersUIProvider>
  );
}
