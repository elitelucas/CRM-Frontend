import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/departments/departmentsActions";
import { useDepartmentsUIContext } from "../DepartmentsUIContext";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

export function DepartmentsDeleteDialog({ show, onHide }) {
  // Departments UI Context
  const departmentUIContext = useDepartmentsUIContext();
  const departmentUIProps = useMemo(() => {
    return {
      ids: departmentUIContext.ids,
      setIds: departmentUIContext.setIds,
      queryParams: departmentUIContext.queryParams,
    };
  }, [departmentUIContext]);

  // Departments Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.departments.actionsLoading }),
    shallowEqual
  );

  // if department weren't selected we should close modal
  useEffect(() => {
    if (!departmentUIProps.ids || departmentUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [departmentUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteDepartments = () => {
    // server request for deleting Department by selected ids
    dispatch(actions.deleteDepartments(departmentUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchDepartments(departmentUIProps.queryParams)).then(
        () => {
          // clear selections list
          departmentUIProps.setIds([]);
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
          Departments Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected departments?</span>
        )}
        {isLoading && <span>Departments are deleting...</span>}
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
            onClick={deleteDepartments}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
