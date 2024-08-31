import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addRow } from "../../redux/tableslice";

type Inputs = {
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
};

export default function CreateForm() {
  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  
  const onSubmit: SubmitHandler<Inputs> = (data) => {
  const lastId = parseInt(localStorage.getItem('lastId') || '0', 10);
  const newId = lastId + 1;

  localStorage.setItem('lastId', newId.toString());

  dispatch(addRow({
    id: newId,
    ...data,
  }));

  };

  return (
    <>
      <div className="shadow-lg rounded-lg">
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">
          <div className="big-heading">
            <h1 className="text-3xl font-bold text-white">Personal Details</h1>
          </div>
          <div className="sm:flex">
            <p className="text-white">
              Make changes to your <b>Profile Account</b> here.
            </p>
            <span
              style={{ borderRadius: "6px" }}
              className="text-white sm:mx-1 bg-red-500 px-1 font-bold"
            >
            Click save when you're done
            </span>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-5">
        <div className="grid md:grid-cols-3 gap-4 my-1 sm:grid-cols-2">
            {/* First Name field */}
            <div className="flex flex-col">
              <label>
                First Name<span className="text-red-600 text-lg">*</span>
              </label>
              <input
              style={{borderRadius: "4px"}}
              placeholder="Adib"
                className="border outline-none p-2"
                {...register("firstName", { required: true })}
              />
              {errors.firstName && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>

            {/* Middle Name field */}
            <div className="flex flex-col">
              <label>Middle Name<span className="text-red-600 text-lg">*</span></label>
              <input
              style={{borderRadius: "4px"}}
                placeholder="Pathan"
                className="border outline-none p-2 rounded-lg"
                {...register("middleName", { required: true })}
              />
              {errors.middleName && <span className="text-red-500 text-sm">This field is required</span>}
            </div>

            {/* Last Name field */}
            <div className="flex flex-col">
              <label>
                Last Name<span className="text-red-600 text-lg">*</span>
              </label>
              <input
              style={{borderRadius: "4px"}}
               placeholder="Khan"
                className="border outline-none p-2 rounded-lg"
                {...register("lastName", { required: true })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 my-1">
            {/* Email field */}
            <div className="flex flex-col">
              <label>
                Email<span className="text-red-600 text-lg">*</span>
              </label>
              <input
              style={{borderRadius: "4px"}}
                placeholder="adibdemo@gmail.com"
                className="border outline-none p-2 rounded-lg"
                type="email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>

            {/* Phone field */}
            <div className="flex flex-col">
              <label>
                Phone<span className="text-red-600 text-lg">*</span>
              </label>
              <input
              style={{borderRadius: "4px"}}
                type="number"
                placeholder="123-456-789"
                className="border outline-none p-2 rounded-lg"
                {...register("phone", { required: true })}
              />
              {errors.phone && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>
          </div>

          {/* Address field */}
          <div className="flex flex-col">
            <label>
              Address<span className="text-red-600 text-lg">*</span>
            </label>
            <textarea
            style={{borderRadius: "4px"}}
              rows={4}
              placeholder="Type your address here"
                className="border outline-none p-2 rounded-lg"
              {...register("address", { required: true })}
            />
            {errors.address && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
          </div>

          {/* Pin Code field */}
          <div className="grid md:grid-cols-3 gap-4 my-1 sm:grid-cols-2">
            <div className="flex flex-col">
              <label>
                Pin Code<span className="text-red-600 text-lg">*</span>
              </label>
              <input
              style={{borderRadius: "4px"}}
                type="number"
                placeholder="456987"
                className="border outline-none p-2 rounded-lg"
                {...register("pinCode", { required: true })}
              />
              {errors.pinCode && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>

            {/* Country field */}
            <div className="flex flex-col">
              <label>
                Country<span className="text-red-600 text-lg">*</span>
              </label>
              <input
              style={{borderRadius: "4px"}}
                placeholder="India"
                className="border outline-none p-2 rounded-lg"
                {...register("country", { required: true })}
              />
              {errors.country && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>

            {/* state field */}
            <div className="flex flex-col">
              <label>
                State<span className="text-red-600 text-lg">*</span>
              </label>
              <input
              style={{borderRadius: "4px"}}
                placeholder="Maharashtra"
                className="border outline-none p-2 rounded-lg"
                {...register("state", { required: true })}
              />
              {errors.state && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>
          </div>

          {/* city field */}
          <div className="my-1">
            <div className="flex flex-col">
              <label>
                City<span className="text-red-600 text-lg">*</span>
              </label>
              <input
              style={{borderRadius: "4px"}}
                placeholder="Mumbai"
                className="border outline-none p-2 rounded-lg"
                {...register("city", { required: true })}
              />
              {errors.city && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>
          </div>
          {/* ... */}
          <input
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 cursor-pointer my-2"
            value="Submit"
          />
        </form>
      </div>
    </>
  );
}


