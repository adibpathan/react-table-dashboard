// types.ts
export interface TableRow {
    id: number;
    name: string;
    age: number;
    email: string;
    phone: string;
    status: "Active" | "Not active" | "Pending";
  }
  