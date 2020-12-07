// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/departments/departmentsActions";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../DepartmentsUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useDepartmentsUIContext } from "../DepartmentsUIContext";

export function DepartmentsTable() {
  // Departments UI Context
  const departmentsUIContext = useDepartmentsUIContext();
  const departmentsUIProps = useMemo(() => {
    return {
      ids: departmentsUIContext.ids,
      setIds: departmentsUIContext.setIds,
      queryParams: departmentsUIContext.queryParams,
      setQueryParams: departmentsUIContext.setQueryParams,
      openEditDepartmentDialog: departmentsUIContext.openEditDepartmentDialog,
      openDeleteDepartmentDialog: departmentsUIContext.openDeleteDepartmentDialog,
    };
  }, [departmentsUIContext]);

  // Getting curret state of departments list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.departments }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // Departments Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    departmentsUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchDepartments(departmentsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [departmentsUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "no",
      text: "ID",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "name",
      text: "Name",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },    
    {
      dataField: "type",
      text: "Type",
      sort: true,
      sortCaret: sortCaret,
      formatter: columnFormatters.TypeColumnFormatter,
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditDepartmentDialog: departmentsUIProps.openEditDepartmentDialog,
        openDeleteDepartmentDialog: departmentsUIProps.openDeleteDepartmentDialog,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];
  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: departmentsUIProps.queryParams.pageSize,
    page: departmentsUIProps.queryParams.pageNumber,
  };
  return (
    <>
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination
              isLoading={listLoading}
              paginationProps={paginationProps}
            >
              <BootstrapTable
                wrapperClasses="table-responsive"
                bordered={false}
                classes="table table-head-custom table-vertical-center overflow-hidden"
                bootstrap4
                remote
                keyField="id"
                data={entities === null ? [] : entities}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  departmentsUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: departmentsUIProps.ids,
                  setIds: departmentsUIProps.setIds,
                })}
                {...paginationTableProps}
              >
                <PleaseWaitMessage entities={entities} />
                <NoRecordsFoundMessage entities={entities} />
              </BootstrapTable>
            </Pagination>
          );
        }}
      </PaginationProvider>
    </>
  );
}
