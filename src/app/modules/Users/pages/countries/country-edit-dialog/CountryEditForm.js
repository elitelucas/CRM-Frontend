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
import { useSnackbar  } from 'notistack';
// Validation schema
const CountryEditSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Name is required"),
  
});



export function CountryEditForm({
  saveCountry,
  country,
  actionsLoading,
  onHide,
}) {
  const { enqueueSnackbar } = useSnackbar();
    // Getting curret state of countries list from store (Redux)
    const { currentState } = useSelector(
      (state) => ({ currentState: state.countries }),
      shallowEqual
    );
    const { totalCount, entities, listLoading } = currentState;
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={country}
        validationSchema={CountryEditSchema}
        onSubmit={(values) => {
          // console.log(values);
          if(values.type==1){
            let aa=entities.find(ele=>ele.type==1);
            if(aa && aa.id!=values.id){
              enqueueSnackbar('Only one "main" item allowed',{ 
                variant: 'error',
            });
              return;
            }
          }
          
          saveCountry(values);
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
                      name="name"
                      component={Input}
                      placeholder="Country Name"
                      label="Country Name"
                    />
                  </div>
                  <div className="col-lg-4">
                    <Select name="type" label="Type">
                      <option value="1">Main</option>
                      <option value="0">Part</option>
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
