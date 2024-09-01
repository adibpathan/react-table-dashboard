// import React from "react";

// interface GlobalFilterProps {
//   globalFilter: any;
//   setGlobalFilter: (filter: any) => void;
// }

// const GlobalFilter: React.FC<GlobalFilterProps> = ({
//   globalFilter,
//   setGlobalFilter,
// }) => {
//   return (
//     <input
//       value={globalFilter || ""}
//       onChange={(e) => setGlobalFilter(e.target.value)}
//       placeholder="Search..."
//       style={{
//         padding: "5px 20px",
//         boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
//         outline: "none",
//         borderRadius: "4px",
//         width: "30%"
//       }}
//     />
//   );
// };

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
      className="
        px-5 py-2
        shadow-lg
        outline-none
        rounded-md
        w-1/3
        border border-gray-300
        focus:border-blue-500
        focus:ring-2
        focus:ring-blue-200
        transition
        duration-200
      "
    />
  );
};

export default GlobalFilter;

