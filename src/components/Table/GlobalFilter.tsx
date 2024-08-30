import React from "react";

const GlobalFilter: React.FC<{
  globalFilter: string | undefined;
  setGlobalFilter: (filterValue: string | undefined) => void;
}> = ({ globalFilter, setGlobalFilter }) => (
  <input
    value={globalFilter || ""}
    onChange={(e) => setGlobalFilter(e.target.value || undefined)}
    placeholder="Search..."
    className="global-filter"
    style={{width: "400px"}}
  />
);

export default GlobalFilter;
