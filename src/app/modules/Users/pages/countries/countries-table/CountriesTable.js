// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/countries/countriesActions";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../CountriesUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useCountriesUIContext } from "../CountriesUIContext";

export function CountriesTable() {
  // Countries UI Context
  const countriesUIContext = useCountriesUIContext();
  const countriesUIProps = useMemo(() => {
    return {
      ids: countriesUIContext.ids,
      setIds: countriesUIContext.setIds,
      queryParams: countriesUIContext.queryParams,
      setQueryParams: countriesUIContext.setQueryParams,
      openEditCountryDialog: countriesUIContext.openEditCountryDialog,
      openDeleteCountryDialog: countriesUIContext.openDeleteCountryDialog,
    };
  }, [countriesUIContext]);

  // Getting curret state of countries list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.countries }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;

  // Countries Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    countriesUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchCountries(countriesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countriesUIProps.queryParams, dispatch]);
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
        openEditCountryDialog: countriesUIProps.openEditCountryDialog,
        openDeleteCountryDialog: countriesUIProps.openDeleteCountryDialog,
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
    sizePerPage: countriesUIProps.queryParams.pageSize,
    page: countriesUIProps.queryParams.pageNumber,
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
                  countriesUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: countriesUIProps.ids,
                  setIds: countriesUIProps.setIds,
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
