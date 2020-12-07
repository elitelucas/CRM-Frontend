import React, {createContext, useContext, useState, useCallback} from "react";
import {isEqual, isFunction} from "lodash";
import {initialFilter} from "./CountriesUIHelpers";

const CountriesUIContext = createContext();

export function useCountriesUIContext() {
  return useContext(CountriesUIContext);
}

export const CountriesUIConsumer = CountriesUIContext.Consumer;

export function CountriesUIProvider({countriesUIEvents, children}) {
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
  const [ids, setIds] = useState([]);
  const setQueryParams = useCallback(nextQueryParams => {
    setQueryParamsBase(prevQueryParams => {
      if (isFunction(nextQueryParams)) {
        nextQueryParams = nextQueryParams(prevQueryParams);
      }

      if (isEqual(prevQueryParams, nextQueryParams)) {
        return prevQueryParams;
      }

      return nextQueryParams;
    });
  }, []);

  const initCountry = {
    id: undefined,
    name: "",    
    type: 0
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initCountry,
    newCountryButtonClick: countriesUIEvents.newCountryButtonClick,
    openEditCountryDialog: countriesUIEvents.openEditCountryDialog,
    openDeleteCountryDialog: countriesUIEvents.openDeleteCountryDialog,
    openDeleteCountriesDialog: countriesUIEvents.openDeleteCountriesDialog   
  };

  return <CountriesUIContext.Provider value={value}>{children}</CountriesUIContext.Provider>;
}