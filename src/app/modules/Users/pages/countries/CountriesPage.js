import React from "react";
import { Route } from "react-router-dom";
import { CountriesLoadingDialog } from "./countries-loading-dialog/CountriesLoadingDialog";
import { CountryEditDialog } from "./country-edit-dialog/CountryEditDialog";
import { CountryDeleteDialog } from "./country-delete-dialog/CountryDeleteDialog";
import { CountriesDeleteDialog } from "./countries-delete-dialog/CountriesDeleteDialog";
import { CountriesUIProvider } from "./CountriesUIContext";
import { CountriesCard } from "./CountriesCard";

export function CountriesPage({ history }) {
  const countriesUIEvents = {
    newCountryButtonClick: () => {
      history.push("/users/countries/new");
    },
    openEditCountryDialog: (id) => {
      history.push(`/users/countries/${id}/edit`);
    },
    openDeleteCountryDialog: (id) => {
      history.push(`/users/countries/${id}/delete`);
    },
    openDeleteCountriesDialog: () => {
      history.push(`/users/countries/deleteCountries`);
    },
    openFetchCountriesDialog: () => {
      history.push(`/users/countries/fetch`);
    },
    openUpdateCountriesStatusDialog: () => {
      history.push("/users/countries/updateStatus");
    }
  }

  return (
    <CountriesUIProvider countriesUIEvents={countriesUIEvents}>
      <CountriesLoadingDialog />
      <Route path="/users/countries/new">
        {({ history, match }) => (
          <CountryEditDialog
            show={match != null}
            onHide={() => {
              history.push("/users/countries");
            }}
          />
        )}
      </Route>
      <Route path="/users/countries/:id/edit">
        {({ history, match }) => (
          <CountryEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/users/countries");
            }}
          />
        )}
      </Route>
      <Route path="/users/countries/deleteCountries">
        {({ history, match }) => (
          <CountriesDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/users/countries");
            }}
          />
        )}
      </Route>
      <Route path="/users/countries/:id/delete">
        {({ history, match }) => (
          <CountryDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/users/countries");
            }}
          />
        )}
      </Route>
     
      <CountriesCard />
    </CountriesUIProvider>
  );
}
