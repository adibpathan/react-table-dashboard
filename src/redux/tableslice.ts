
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RowData {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  pinCode: string;
  country: string;
  state: string;
  city: string;
  status: string;
}

interface TableState {
  data: RowData[];
}

const initialState: TableState = {
  data: [
    {
        id: 1,
        firstName: 'John',
        middleName: 'A.',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: "123-456-7890",
        address: '123 Maple St',
        pinCode: "12345",
        country: 'USA',
        state: 'California',
        city: 'Los Angeles',
        status: 'Active',
      },
      {
        id: 2,
        firstName: 'Jane',
        middleName: 'B.',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        phone: '987-654-3210',
        address: '456 Oak Ave',
        pinCode: '67890',
        country: 'USA',
        state: 'New York',
        city: 'New York City',
        status: 'Inactive',
      },
      {
        id: 3,
        firstName: 'Alice',
        middleName: 'C.',
        lastName: 'Johnson',
        email: 'alice.johnson@example.com',
        phone: '456-789-0123',
        address: '789 Pine Rd',
        pinCode: '54321',
        country: 'USA',
        state: 'Texas',
        city: 'Houston',
        status: 'Pending',
      },
      {
        id: 4,
        firstName: 'Bob',
        middleName: 'D.',
        lastName: 'Brown',
        email: 'bob.brown@example.com',
        phone: '654-321-0987',
        address: '321 Birch Ln',
        pinCode: '67890',
        country: 'USA',
        state: 'Florida',
        city: 'Miami',
        status: 'Inactive',
      },
      {
        id: 5,
        firstName: 'Cathy',
        middleName: 'E.',
        lastName: 'Davis',
        email: 'cathy.davis@example.com',
        phone: '789-012-3456',
        address: '234 Cedar St',
        pinCode: '98765',
        country: 'USA',
        state: 'Illinois',
        city: 'Chicago',
        status: 'Pending',
      },
      {
        id: 6,
        firstName: 'David',
        middleName: 'F.',
        lastName: 'Evans',
        email: 'david.evans@example.com',
        phone: '321-654-9870',
        address: '567 Elm St',
        pinCode: '45678',
        country: 'USA',
        state: 'California',
        city: 'San Francisco',
        status: 'Active',
      },
      {
        id: 7,
        firstName: 'Eve',
        middleName: 'G.',
        lastName: 'Foster',
        email: 'eve.foster@example.com',
        phone: '012-345-6789',
        address: '678 Walnut St',
        pinCode: '34567',
        country: 'USA',
        state: 'Nevada',
        city: 'Las Vegas',
        status: 'Inactive',
      },
      {
        id: 8,
        firstName: 'Frank',
        middleName: 'H.',
        lastName: 'Green',
        email: 'frank.green@example.com',
        phone: '234-567-8901',
        address: '789 Spruce St',
        pinCode: '23456',
        country: 'USA',
        state: 'Arizona',
        city: 'Phoenix',
        status: 'Active',
      },
      {
        id: 9,
        firstName: 'Grace',
        middleName: 'I.',
        lastName: 'Hill',
        email: 'grace.hill@example.com',
        phone: '678-901-2345',
        address: '890 Maple St',
        pinCode: '12345',
        country: 'USA',
        state: 'Washington',
        city: 'Seattle',
        status: 'Pending',
      },
      {
        id: 10,
        firstName: 'Henry',
        middleName: 'J.',
        lastName: 'King',
        email: 'henry.king@example.com',
        phone: '890-123-4567',
        address: '901 Fir St',
        pinCode: '67890',
        country: 'USA',
        state: 'Oregon',
        city: 'Portland',
        status: 'Inactive',
      },
  ]
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    addRow: (state, action: PayloadAction<RowData>) => {
      state.data.push(action.payload);
    },
    updateRow: (state, action: PayloadAction<RowData>) => {
      const updatedRow = action.payload;
      const index = state.data.findIndex(row => row.id === updatedRow.id);
      if (index !== -1) {
        state.data[index] = updatedRow;
      }
    },
  },
});

export const { addRow, updateRow } = tableSlice.actions;
export default tableSlice.reducer;














