import { useForm } from "react-hook-form";

const VehicleForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
  } = useForm();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <input
        placeholder="Registration Number"
        {...register("registration")}
        className="w-full border p-3 rounded-lg"
      />

      <input
        placeholder="Vehicle Model"
        {...register("model")}
        className="w-full border p-3 rounded-lg"
      />

      <input
        type="number"
        placeholder="Capacity"
        {...register("capacity")}
        className="w-full border p-3 rounded-lg"
      />

      <button className="bg-blue-600 text-gray-800 px-5 py-3 rounded-lg w-full">
        Save Vehicle
      </button>
    </form>
  );
};

export default VehicleForm;