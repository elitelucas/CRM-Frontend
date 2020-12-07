import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/countries/countriesActions";
import { useCountriesUIContext } from "../CountriesUIContext";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

export function CountriesDeleteDialog({ show, onHide }) {
  // Countries UI Context
  const countriesUIContext = useCountriesUIContext();
  const countriesUIProps = useMemo(() => {
    return {
      ids: countriesUIContext.ids,
      setIds: countriesUIContext.setIds,
      queryParams: countriesUIContext.queryParams,
    };
  }, [countriesUIContext]);

  // Countries Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.countries.actionsLoading }),
    shallowEqual
  );

  // if countries weren't selected we should close modal
  useEffect(() => {
    if (!countriesUIProps.ids || countriesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countriesUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteCountries = () => {
    // server request for deleting Country by selected ids
    dispatch(actions.deleteCountries(countriesUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchCountries(countriesUIProps.queryParams)).then(
        () => {
          // clear selections list
          countriesUIProps.setIds([]);
          // closing delete modal
          onHide();
        }
      );
    });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {/*begin::Loading*/}
      {isLoading && <ModalProgressBar />}
      {/*end::Loading*/}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Countries Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected countries?</span>
        )}
        {isLoading && <span>Country are deleting...</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            Cancel
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteCountries}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
