import React, { useMemo } from "react";
import { useCountriesUIContext } from "../CountriesUIContext";

export function CountriesGrouping() {
  // Countries UI Context
  const countriesUIContext = useCountriesUIContext();
  const countriesUIProps = useMemo(() => {
    return {
      ids: countriesUIContext.ids,
      setIds: countriesUIContext.setIds,
      openDeleteCountriesDialog: countriesUIContext.openDeleteCountriesDialog
    
    };
  }, [countriesUIContext]);
  console.log(countriesUIProps.openDeleteCountriesDialog);
  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count: <b>{countriesUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={countriesUIProps.openDeleteCountriesDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
