import VehicleForm from "./VehicleForm";

const VehicleModal = ({
  open,
  onClose,
  onSubmit,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

      <div className="bg-white p-8 rounded-xl w-[500px]">

        <div className="flex justify-between mb-5">

          <h2 className="text-2xl font-bold">
            Add Vehicle
          </h2>

          <button onClick={onClose}>
            ✖
          </button>

        </div>

        <VehicleForm
          onSubmit={onSubmit}
        />

      </div>

    </div>
  );
};

export default VehicleModal;