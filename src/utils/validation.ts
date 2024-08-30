import { z } from "zod";

export const schema = z.object({
  name: z.string().min(3, "Name is required"),
  age: z.number().min(0, "Age must be a positive number"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  status: z.enum(["Active", "Not active", "Pending"]),
});
