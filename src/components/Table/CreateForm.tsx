import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  name: string;
  age: number;
  email: string;
  phone: string;
  status: string;
};

export default function CreateForm() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-sm mx-auto p-4 bg-white shadow-2xl rounded">
      {/* Name field */}
      <div>
        <label className="block text-gray-700">Name</label>
        <input
          className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none bg-slate-100"
          {...register("name", { required: true })}
        />
        {errors.name && <span className="text-red-500 text-sm">This field is required</span>}
      </div>

      {/* Age field */}
      <div>
        <label className="block text-gray-700">Age</label>
        <input
          type="number"
          className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none bg-slate-100"
          {...register("age", { required: true })}
        />
        {errors.age && <span className="text-red-500 text-sm">This field is required</span>}
      </div>

      {/* Email field */}
      <div>
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none bg-slate-100"
          {...register("email", { required: true })}
        />
        {errors.email && <span className="text-red-500 text-sm">This field is required</span>}
      </div>

      {/* Phone field */}
      <div>
        <label className="block text-gray-700">Phone</label>
        <input
          type="tel"
          className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none bg-slate-100"
          {...register("phone", { required: true })}
        />
        {errors.phone && <span className="text-red-500 text-sm">This field is required</span>}
      </div>

      {/* Status field with select dropdown */}
      <div>
        <label className="block text-gray-700">Status</label>
        <select
          className="w-full mt-1 p-2 border border-gray-300 rounded-md outline-none cursor-pointer"
          {...register("status", { required: true })}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Pending">Pending</option>
        </select>
        {errors.status && <span className="text-red-500 text-sm">This field is required</span>}
      </div>

      <input
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        value="Submit"
      />
    </form>
  );
}
