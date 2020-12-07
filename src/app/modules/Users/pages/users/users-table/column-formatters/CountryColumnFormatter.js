// please be familiar with react-bootstrap-table-next column formaters
// https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Work%20on%20Columns&selectedStory=Column%20Formatter&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
import React from "react";


const CountryColumnFormatter= (countries)=>(cellContent, row) =>{
  if(countries)
    return (
      <>
        <span
          className={`label label-dot label-${
            countries.find(ele=>ele.id==row.country).type===1 ? 'danger' : 'primary'
          } mr-2`}
        ></span>
        &nbsp;
        <span className={`font-bold font-${countries.find(ele=>ele.id==row.country).type===1 ? 'danger' : 'primary'}`}>
          {countries.find(ele=>ele.id==row.country).name}
        </span>
      </>
    );
  else
    return ('');
}
export {CountryColumnFormatter};