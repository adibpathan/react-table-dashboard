import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem
} from "../../ui/dropdown-menu";

interface ColumnFilterProps {
  columns: Array<{ id: string; Header: string }>;
  setColumnFilter: (filter: Set<string>) => void;
}

const ColumnFilter: React.FC<ColumnFilterProps> = ({ columns, setColumnFilter }) => {
  const [selectedColumns, setSelectedColumns] = useState<Set<string>>(
    new Set(columns.map(col => col.id))
  );

  const handleColumnChange = (id: string) => {
    const newSelectedColumns = new Set(selectedColumns);
    if (newSelectedColumns.has(id)) {
      newSelectedColumns.delete(id);
    } else {
      newSelectedColumns.add(id);
    }
    setSelectedColumns(newSelectedColumns);
    setColumnFilter(newSelectedColumns);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', background: '#fff' }}
        >
          Filter Columns
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {columns.map(column => (
          <DropdownMenuCheckboxItem
            key={column.id}
            checked={selectedColumns.has(column.id)}
            onCheckedChange={() => handleColumnChange(column.id)}
          >
            {column.Header}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ColumnFilter;

