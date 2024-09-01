import React from "react";
import { useSelector } from "react-redux";
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
  useFilters,
} from "react-table";
import { RootState } from "../../redux/store";
import { columns } from "../Data";
import "./Table.css";
import GlobalFilter from "./GlobalFilter";
import { DialogCloseButton } from "./DialogCloseButton";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "../../ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const Table: React.FC = () => {
  const tableData = useSelector((state: RootState) => state.table.data);

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
    allColumns,
    toggleHideColumn,
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

  const downloadCSV = () => {
    const csvRows = [];
    csvRows.push(
      headerGroups
        .map((headerGroup) =>
          headerGroup.headers.map((column) => column.render("Header")).join(",")
        )
        .join(",")
    );
    page.forEach((row) => {
      prepareRow(row);
      csvRows.push(row.cells.map((cell) => `"${cell.value}"`).join(","));
    });
    const csvData = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(csvData);
    link.download = "table-data.csv";
    link.click();
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-2">
          <button
            onClick={downloadCSV}
            className="px-4 py-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700"
          >
            Export to Excel
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center px-4 py-2 border-gray-300 text-gray-700 rounded-md cursor-pointer">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-gray-100">
              {allColumns.map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize cursor-pointer"
                  checked={column.isVisible}
                  onCheckedChange={(value) =>
                    toggleHideColumn(column.id, !value)
                  }
                >
                  {/* <input
                    type="checkbox"
                    checked={column.isVisible}
                    onChange={() => toggleHideColumn(column.id, !column.isVisible)}
                    className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out rounded mr-2 cursor-pointer"
                  /> */}
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <GlobalFilter
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </div>
      <div className="table-container overflow-x-auto">
        <table
          {...getTableProps()}
          className="min-w-full bg-white border border-gray-300 rounded-md"
        >
          <thead className="bg-gray-100">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} className="border-b">
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="px-4 py-2 text-left text-sm font-medium text-gray-700"
                  >
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
          <tbody {...getTableBodyProps()} className="divide-y divide-gray-200">
            {page.map((row: any) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className="hover:bg-gray-100 transition-colors"
                >
                  {row.cells.map((cell: any) => (
                    <td
                      {...cell.getCellProps()}
                      className="px-4 py-2 text-sm text-gray-600"
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                  <td className="px-4 py-2 text-sm">
                    <DialogCloseButton rowData={row.original} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="pagination mt-4 flex justify-between items-center">
        <div>
          <button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            className="px-2 py-1 bg-gray-300 rounded disabled:bg-gray-200"
          >
            {"<<"}
          </button>{" "}
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="px-2 py-1 bg-gray-300 rounded disabled:bg-gray-200"
          >
            {"<"}
          </button>{" "}
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="px-2 py-1 bg-gray-300 rounded disabled:bg-gray-200"
          >
            {">"}
          </button>{" "}
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            className="px-2 py-1 bg-gray-300 rounded disabled:bg-gray-200"
          >
            {">>"}
          </button>
        </div>
        <div>
          <span className="mr-2">
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
              className="w-16 p-1 border border-gray-300 rounded-md"
            />
          </span>{" "}
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="ml-2 p-1 border border-gray-300 rounded-md"
          >
            {[10, 20, 30, 40, 50].map((size) => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default Table;























