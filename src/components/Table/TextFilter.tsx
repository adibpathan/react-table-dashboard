// Filters.tsx
import React from 'react';

interface TextFilterProps {
  column: {
    filterValue: string;
    setFilter: (filterValue: string | undefined) => void;
    id: string;
  };
}

export const TextFilter: React.FC<TextFilterProps> = ({ column }) => {
  const { filterValue, setFilter, id } = column;

  return (
    <input
      value={filterValue || ''}
      onChange={(e) => setFilter(e.target.value || undefined)}
      placeholder={`Search ${id}`}
    />
  );
};
