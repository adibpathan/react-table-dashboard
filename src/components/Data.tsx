

import { Column } from 'react-table';
import { TextFilter } from './Table/TextFilter';

// Define your table columns
export const columns: Column[] = [
  {
    Header: 'ID',
    accessor: 'id',
    Filter: TextFilter,
  },
  {
    Header: 'Name',
    accessor: 'name',
    Filter: TextFilter,
  },
  {
    Header: 'Age',
    accessor: 'age',
    Filter: TextFilter,
  },
  {
    Header: 'Email',
    accessor: 'email',
    Filter: TextFilter,
  },
  {
    Header: 'Phone',
    accessor: 'phone',
    Filter: TextFilter,
  },
  {
    Header: 'Status',
    accessor: 'status',
    Filter: TextFilter,
  },
];

// Define your table data
export const data = [
  { id: 1, name: 'John Doe', age: 28, email: 'john.doe@example.com', phone: '123-456-7890', status: 'Active' },
  { id: 2, name: 'Jane Smith', age: 34, email: 'jane.smith@example.com', phone: '987-654-3210', status: 'Inactive' },
  { id: 3, name: 'Alice Johnson', age: 23, email: 'alice.johnson@example.com', phone: '456-789-0123', status: 'Pending' },
  { id: 4, name: 'Bob Brown', age: 29, email: 'bob.brown@example.com', phone: '654-321-0987' , status: 'Inactive'},
  { id: 5, name: 'Cathy Davis', age: 31, email: 'cathy.davis@example.com', phone: '789-012-3456' , status: 'Pending'},
  { id: 6, name: 'David Evans', age: 26, email: 'david.evans@example.com', phone: '321-654-9870', status: 'Active' },
  { id: 7, name: 'Eve Foster', age: 27, email: 'eve.foster@example.com', phone: '012-345-6789' , status: 'Inactive'},
  { id: 8, name: 'Frank Green', age: 32, email: 'frank.green@example.com', phone: '234-567-8901' , status: 'Active'},
  { id: 9, name: 'Grace Hill', age: 25, email: 'grace.hill@example.com', phone: '678-901-2345' , status: 'Pending'},
  { id: 10, name: 'Henry King', age: 30, email: 'henry.king@example.com', phone: '890-123-4567' , status: 'Inactive'},
  { id: 11, name: 'Isla Lee', age: 28, email: 'isla.lee@example.com', phone: '567-890-1234' , status: 'Active'},
  { id: 12, name: 'Jack Miller', age: 33, email: 'jack.miller@example.com', phone: '345-678-9012' , status: 'Pending'},
  // Add more data as needed
];



