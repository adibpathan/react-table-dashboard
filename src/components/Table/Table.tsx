import React, { useState } from "react";
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
  useFilters,
} from "react-table";
import { data as initialData, columns } from "../Data";
import "./Table.css";
import GlobalFilter from "./GlobalFilter";
import EditPopover from "./EditPopover";
import z from "zod";

// Define your Zod schema (Example schema)
const schema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.string().min(1, "Age is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  status: z.string().min(1, "Status is required"),
});

const Table: React.FC = () => {
  const [tableData, setTableData] = useState(initialData);
  const [editingRowData, setEditingRowData] = useState<any>(null);
  const [formValues, setFormValues] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    status: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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
    setFormValues({
      name: rowData.name || "",
      age: rowData.age || "",
      email: rowData.email || "",
      phone: rowData.phone || "",
      status: rowData.status || "",
    });
  };

  const handleSaveChanges = () => {
    try {
      // Validate form values using Zod schema
      schema.parse(formValues);

      // Update the specific row in the table data
      const updatedData = tableData.map((row) =>
        row.id === editingRowData.id ? { ...row, ...formValues } : row
      );
      setTableData(updatedData);
      setEditingRowData(null);
      setErrors({});
    } catch (e) {
      if (e instanceof z.ZodError) {
        const formattedErrors: { [key: string]: string } = {};
        e.errors.forEach((err) => {
          if (err.path[0]) formattedErrors[err.path[0]] = err.message;
        });
        setErrors(formattedErrors);
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
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
      <div className="table-container ">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={column.id}
                    className={column.canSort ? "sortable" : ""}
                  >
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                    <div>
                      {column.canFilter ? column.render("Filter") : null}
                    </div>
                  </th>
                ))}
                <th key="edit">Actions</th>
              </tr>
            ))}
          </thead>
         {/* //edit prop here  */}
         <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={row.id}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} key={cell.column.id}>
                      {cell.render("Cell")}
                    </td>
                  ))}
                  <td>
                    <EditPopover
                      row={row.original}
                      editingRowData={editingRowData}
                      setEditingRowData={setEditingRowData}
                      formValues={formValues}
                      setFormValues={setFormValues}
                      handleChange={handleChange}
                      handleSaveChanges={handleSaveChanges}
                      errors={errors}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="pagination" style={{margin: "40px 50px"}}>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} style={{}}>
          {"<<"}
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
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
            style={{
              width: "100px",
              marginRight: "10px",
              padding: "4px",
              border: "1px solid black",
              borderRadius: "4px",
            }}
          />
        </span>
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
          style={{
            padding: "6px",
            border: "1px solid black",
            borderRadius: "4px",
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Table;
