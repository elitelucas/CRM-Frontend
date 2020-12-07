import React, { useMemo } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useUsersUIContext } from "../UsersUIContext";

const prepareFilter = (queryParams, values) => {
  const { role,  searchText } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};
  console.log(role);
  // Filter by role
  filter.role = role !== "" ? role : undefined;
  // // Filter by type
  // filter.type = type !== "" ? +type : undefined;
  // Filter by all fields
  filter.firstname = searchText;
  filter.lastname = searchText;
  if (searchText) {
    filter.phone = searchText;
    filter.email = searchText;
  }
  newQueryParams.filter = filter;
  return newQueryParams;
};

export function UsersFilter({ listLoading }) {
  // Users UI Context
  const usersUIContext = useUsersUIContext();
  const usersUIProps = useMemo(() => {
    return {
      queryParams: usersUIContext.queryParams,
      setQueryParams: usersUIContext.setQueryParams,
    };
  }, [usersUIContext]);

  // queryParams, setQueryParams,
  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(usersUIProps.queryParams, values);
    if (!isEqual(newQueryParams, usersUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      // update list by queryParams
      usersUIProps.setQueryParams(newQueryParams);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          role: "", // values => All=""/Susspended=0/Active=1/Pending=2
          // type: "", // values => All=""/Business=0/Individual=1
          searchText: "",
        }}
        onSubmit={(values) => {
          applyFilter(values);
        }}
      >
        {({
          values,
          handleSubmit,
          handleBlur,
          handleChange,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit} className="form form-label-right">
            <div className="form-group row">
              <div className="col-lg-2">
                <select
                  className="form-control"
                  name="role"
                  placeholder="Filter by Role"
                  // TODO: Change this code
                  onChange={(e) => {
                    setFieldValue("role", e.target.value);
                    handleSubmit();
                  }}
                  onBlur={handleBlur}
                  value={values.role}
                >
                  <option value="">All</option>
                  <option value="Admin">Admin</option>
                  <option value="Member">Member</option>                
                </select>
                <small className="form-text text-muted">
                  <b>Filter</b> by Role
                </small>
              </div>
              {/* <div className="col-lg-2">
                <select
                  className="form-control"
                  placeholder="Filter by Type"
                  name="type"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setFieldValue("type", e.target.value);
                    handleSubmit();
                  }}
                  value={values.type}
                >
                  <option value="">All</option>
                  <option value="0">Business</option>
                  <option value="1">Individual</option>
                </select>
                <small className="form-text text-muted">
                  <b>Filter</b> by Type
                </small>
              </div> */}
              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  name="searchText"
                  placeholder="Search"
                  onBlur={handleBlur}
                  value={values.searchText}
                  onChange={(e) => {
                    setFieldValue("searchText", e.target.value);
                    handleSubmit();
                  }}
                />
                <small className="form-text text-muted">
                  <b>Search</b> in all fields
                </small>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}
