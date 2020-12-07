// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Input,
  Select,
  DatePickerField,
} from "../../../../../../_metronic/_partials/controls";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useSnackbar } from 'notistack';
// Validation schema
const UserEditSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("FirstName is required"),
  lastname: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("LastName is required"),
  email: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .email()
    .required("Email is required"),
  phone: Yup.number()
    .required()
    .positive()
    .integer()
    .required("Phone is required"),
  role: Yup.string()
    .required("Role is required"),
  country: Yup.string()
    .required("Country is required"),
  department: Yup.string()
    .required("Department is required"),

});



export function UserEditForm({
  saveUser,
  user,
  actionsLoading,
  onHide,
}) {
  if(!user.password)
    user.password="";
  const { enqueueSnackbar } = useSnackbar();
  // Getting curret state of users list from store (Redux)
  const { currentState, countriesState, departmentsState } = useSelector(
    (state) => ({
      currentState: state.users,
      countriesState: state.countries,
      departmentsState: state.departments
    }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;
  const { entities: countries } = countriesState;
  const { entities: departments } = departmentsState;
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={user}
        validationSchema={UserEditSchema}
        onSubmit={(values) => {
          console.log(values);


          saveUser(values);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              <Form className="form form-label-right">
                <div className="form-group row">
                  {/* First Name */}
                  <div className="col-lg-4">
                    <Field
                      name="firstname"
                      component={Input}
                      placeholder="First Name"
                      label="First Name"
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      name="lastname"
                      component={Input}
                      placeholder="Last Name"
                      label="Last Name"
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      name="email"
                      component={Input}
                      placeholder="Email"
                      label="Email"
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      name="phone"
                      component={Input}
                      placeholder="Phone"
                      label="Phone"
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      name="password"
                      component={Input}
                      type="password"
                      placeholder="Password"
                      label="Password"
                    />
                  </div>
                  <div className="col-lg-4">
                    <Select name="country" label="Country">
                      <option></option>
                      {
                        countries && countries.map((ele, key) => (
                          <option key={key} value={ele.id}>{ele.name}</option>
                        ))
                      }
                    </Select>
                  </div>
                  <div className="col-lg-4">
                    <Select name="department" label="Department">
                      <option></option>
                      {
                        departments && departments.map((ele, key) => (
                          <option key={key} value={ele.id}>{ele.name}</option>
                        ))
                      }
                    </Select>
                  </div>
                  <div className="col-lg-4">
                    <Select name="role" label="Role">
                    <option></option>
                      <option value="admin">admin</option>
                      <option value="member">member</option>
                    </Select>
                  </div>
                </div>

              </Form>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                onClick={onHide}
                className="btn btn-light btn-elevate"
              >
                Cancel
              </button>
              <> </>
              <button
                type="submit"
                onClick={() => handleSubmit()}
                className="btn btn-primary btn-elevate"
              >
                Save
              </button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}
