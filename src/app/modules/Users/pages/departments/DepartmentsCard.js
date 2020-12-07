import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { DepartmentsFilter } from "./departments-filter/DepartmentsFilter";
import { DepartmentsTable } from "./departments-table/DepartmentsTable";
import { DepartmentsGrouping } from "./departments-grouping/DepartmentsGrouping";
import { useDepartmentsUIContext } from "./DepartmentsUIContext";

export function DepartmentsCard() {
  const departmentsUIContext = useDepartmentsUIContext();
  const departmentsUIProps = useMemo(() => {
    return {
      ids: departmentsUIContext.ids,
      newDepartmentButtonClick: departmentsUIContext.newDepartmentButtonClick,
    };
  }, [departmentsUIContext]);

  return (
    <Card>
      <CardHeader title="Departments list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={departmentsUIProps.newDepartmentButtonClick}
          >
            New Department
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <DepartmentsFilter />
        {departmentsUIProps.ids.length > 0 && <DepartmentsGrouping />}
        <DepartmentsTable />
      </CardBody>
    </Card>
  );
}
