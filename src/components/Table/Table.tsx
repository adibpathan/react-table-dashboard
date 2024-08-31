import React from "react";
import { useSelector } from "react-redux";
import { useTable, useSortBy, usePagination, useGlobalFilter, useFilters } from "react-table";
import { RootState } from "../../redux/store";
import { columns } from "../Data";
import "./Table.css";
import GlobalFilter from "./GlobalFilter";
import { DialogCloseButton } from "./DialgoCloseButton";

const Table: React.FC = () => {
  const tableData = useSelector((state: RootState) => state.table.data);
  const [editingRowData, setEditingRowData] = React.useState<any>(null);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state: { globalFilter },
    setGlobalFilter,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    pageCount,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: tableData,
      initialState: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination
  ) as any;

  const handleEditClick = (rowData: any) => {
    setEditingRowData(rowData);
  };

  const downloadCSV = () => {
    const csvRows = [];
    csvRows.push(columns.map((col) => col.Header).join(","));
    tableData.forEach((row) => {
      csvRows.push(columns.map((col) => row[col.accessor] || "").join(","));
    });
    const csvData = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(csvData);
    link.download = "table-data.csv";
    link.click();
  };

  return (
    <>
      <div className="flex justify-between">
        <button
          onClick={downloadCSV}
          style={{padding: "3px 15px", backgroundColor: "rgb(101, 175, 101)", borderRadius: "4px", color: "white", boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px"}}
        >
          Export to Excel
        </button>
        <GlobalFilter
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </div>
      <div className="table-container">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row: any) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell: any) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                  <td>
                    <DialogCloseButton rowData={row.original} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          {"<<"}
        </button>{" "}
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          {"<"}
        </button>{" "}
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          {">"}
        </button>{" "}
        <button
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {">>"}
        </button>
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[10, 20, 30, 40, 50].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Table;



