// import React from "react";

// const GlobalFilter: React.FC<{
//   globalFilter: string | undefined;
//   setGlobalFilter: (filterValue: string | undefined) => void;
// }> = ({ globalFilter, setGlobalFilter }) => (
//   <input
//     value={globalFilter || ""}
//     onChange={(e) => setGlobalFilter(e.target.value || undefined)}
//     placeholder="Search..."
//     className="global-filter"
//     style={{width: "400px"}}
//   />
// );

// export default GlobalFilter;

import React from "react";

interface GlobalFilterProps {
  globalFilter: any;
  setGlobalFilter: (filter: any) => void;
}

const GlobalFilter: React.FC<GlobalFilterProps> = ({
  globalFilter,
  setGlobalFilter,
}) => {
  return (
    <input
      value={globalFilter || ""}
      onChange={(e) => setGlobalFilter(e.target.value)}
      placeholder="Search..."
      style={{
        padding: "5px 20px",
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        outline: "none",
        borderRadius: "4px",
        width: "30%"
      }}
    />
  );
};

export default GlobalFilter;
