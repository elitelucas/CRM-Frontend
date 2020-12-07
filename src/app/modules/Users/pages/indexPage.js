import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { CountriesPage } from "./countries/CountriesPage";
import { DepartmentsPage } from "./departments/DepartmentsPage";
import { UsersPage } from "./users/UsersPage";

// import { ProductEdit } from "./products/product-edit/ProductEdit";
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";

export default function IndexPage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from eCommerce root URL to /customers */
          <Redirect
            exact={true}
            from="/users"
            to="/users/countries"
          />
        }
        <ContentRoute path="/users/countries" component={CountriesPage} />
        <ContentRoute path="/users/departments" component={DepartmentsPage} />
        <ContentRoute path="/users/users" component={UsersPage} />
        {/* <ContentRoute path="/e-commerce/products/new" component={ProductEdit} />
        <ContentRoute
          path="/e-commerce/products/:id/edit"
          component={ProductEdit}
        />

        <ContentRoute path="/e-commerce/products" component={ProductsPage} /> */}
      </Switch>
    </Suspense>
  );
}
