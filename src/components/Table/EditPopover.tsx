import React, { useEffect } from "react";
import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";

const EditPopover: React.FC<{
  row: any;
  editingRowData: any;
  setEditingRowData: React.Dispatch<React.SetStateAction<any>>;
  formValues: any;
  setFormValues: React.Dispatch<React.SetStateAction<any>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSaveChanges: () => void;
  errors: { [key: string]: string };
}> = ({
  row,
  editingRowData,
  setEditingRowData,
  formValues,
  setFormValues,
  handleChange,
  handleSaveChanges,
  errors
}) => {

  useEffect(() => {
    if (editingRowData && editingRowData.id === row.id) {
      setFormValues({
        name: editingRowData.name || "",
        age: editingRowData.age || "",
        email: editingRowData.email || "",
        phone: editingRowData.phone || "",
        status: editingRowData.status || "Active",
      });
    }
  }, [editingRowData, row.id, setFormValues]);

  return (
    <Popover
      open={!!editingRowData && editingRowData.id === row.id}
      onOpenChange={(open) => {
        if (!open) {
          setEditingRowData(null);
        }
      }}
    >
      <PopoverTrigger asChild>
        <Button
          style={{
            backgroundColor: "#65af65",
            color: "white",
            outline: "none",
            border: "1px solid",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={() => setEditingRowData(row)}
        >
          Edit
        </Button>
      </PopoverTrigger>
      <PopoverContent
        style={{
          backgroundColor: "#f9f9f9",
          padding: "50px",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          position: "absolute",
          right: "400px",
          width: "400px",
        }}
      >
        <div>
          <div>
            <h4>Edit Data</h4>
          </div>
          <div style={{ paddingTop: "30px" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "10px 0",
              }}
            >
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formValues.name || ""}
                onChange={handleChange}
                style={{
                  padding: "8px 2px",
                  border: "1px solid",
                  borderRadius: "4px",
                  outline: "none",
                  marginTop: "7px",
                }}
              />
              {errors.name && (
                <span
                  style={{
                    color: "red",
                    marginTop: "3px",
                  }}
                >
                  {errors.name}
                </span>
              )}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "10px 0",
              }}
            >
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={formValues.age || ""}
                onChange={handleChange}
                style={{
                  padding: "8px 2px",
                  border: "1px solid",
                  borderRadius: "4px",
                  outline: "none",
                  marginTop: "7px",
                }}
              />
              {errors.age && (
                <span
                  style={{
                    color: "red",
                    marginTop: "3px",
                  }}
                >
                  {errors.age}
                </span>
              )}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "10px 0",
              }}
            >
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formValues.email || ""}
                onChange={handleChange}
                style={{
                  padding: "8px 2px",
                  border: "1px solid",
                  borderRadius: "4px",
                  outline: "none",
                  marginTop: "7px",
                }}
              />
              {errors.email && (
                <span
                  style={{
                    color: "red",
                    marginTop: "3px",
                  }}
                >
                  {errors.email}
                </span>
              )}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "10px 0",
              }}
            >
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formValues.phone || ""}
                onChange={handleChange}
                style={{
                  padding: "8px 2px",
                  border: "1px solid",
                  borderRadius: "4px",
                  outline: "none",
                  marginTop: "7px",
                }}
              />
              {errors.phone && (
                <span
                  style={{
                    color: "red",
                    marginTop: "3px",
                  }}
                >
                  {errors.phone}
                </span>
              )}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "10px 0",
              }}
            >
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                value={formValues.status}
                onChange={handleChange}
                style={{
                  padding: "8px 2px",
                  border: "1px solid",
                  borderRadius: "4px",
                  outline: "none",
                  marginTop: "7px",
                }}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
              </select>
              {errors.status && (
                <span
                  style={{
                    color: "red",
                    marginTop: "3px",
                  }}
                >
                  {errors.status}
                </span>
              )}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingTop: "30px",
            }}
          >
            <Button
              style={{
                padding: "5px 15px",
                backgroundColor: "green",
                color: "white",
                outline: "none",
                border: "1px solid",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={handleSaveChanges}
            >
              Save
            </Button>
            <Button
              style={{
                padding: "5px 15px",
                backgroundColor: "red",
                color: "white",
                outline: "none",
                border: "1px solid",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={() => setEditingRowData(null)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default EditPopover;
