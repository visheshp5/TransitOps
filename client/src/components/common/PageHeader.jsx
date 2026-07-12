import PrimaryButton from "./PrimaryButton";

const PageHeader = ({ title, buttonText }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold text-gray-800">
        {title}
      </h1>

      <PrimaryButton>
        {buttonText}
      </PrimaryButton>
    </div>
  );
};

export default PageHeader;