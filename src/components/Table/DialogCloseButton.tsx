import { useState } from "react";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { z, ZodError } from 'zod';
import { useDispatch } from "react-redux";
import { updateRow } from "../../redux/tableslice"; // Assuming you have an updateRow action

const formSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits long'),
  status: z.enum(['Active', 'Inactive', 'Pending']),
});

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: string;
};

export function DialogCloseButton({ rowData }: { rowData: any }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<FormData>({
    firstName: rowData.firstName || '',
    lastName: rowData.lastName || '',
    email: rowData.email || '',
    phone: rowData.phone || '',
    status: rowData.status || 'Active',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isOpen, setIsOpen] = useState(false); // State to manage dialog visibility

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveChanges = () => {
    try {
      formSchema.parse(formData);
      dispatch(updateRow({ id: rowData.id, ...formData }));
      setErrors({});
      setIsOpen(false); // Close the dialog after saving
    } catch (error) {
      if (error instanceof ZodError) {
        const validationErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            validationErrors[err.path[0]] = err.message;
          }
        });
        setErrors(validationErrors);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="bg-green-500 text-white hover:bg-green-400"
          onClick={() => setIsOpen(true)} // Open the dialog on click
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Edit Data</DialogTitle>
          <DialogDescription>
            Update the details below.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex flex-col">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className={`border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} p-2 rounded`}
            />
            {errors.firstName && (
              <span className="text-red-500 text-sm">{errors.firstName}</span>
            )}
          </div>

          <div className="flex flex-col">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className={`border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} p-2 rounded`}
            />
            {errors.lastName && (
              <span className="text-red-500 text-sm">{errors.lastName}</span>
            )}
          </div>

          <div className="flex flex-col">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={`border ${errors.email ? 'border-red-500' : 'border-gray-300'} p-2 rounded`}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
          </div>

          <div className="flex flex-col">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className={`border ${errors.phone ? 'border-red-500' : 'border-gray-300'} p-2 rounded`}
            />
            {errors.phone && (
              <span className="text-red-500 text-sm">{errors.phone}</span>
            )}
          </div>

          <div className="flex flex-col">
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="p-2 border rounded"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
            </select>
            {errors.status && (
              <span className="text-red-500 text-sm">{errors.status}</span>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2 mt-4">
          <Button
            className="bg-green-500 text-white hover:bg-green-600"
            onClick={handleSaveChanges}
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}





