import PrimaryButton from "./PrimaryButton";

const PageHeader = ({ title, buttonText }) => {
  return (
    <div className="flex justify-between items-center mb-8">

      <div>

        <h1
          className="text-4xl font-bold"
          style={{
            color: "var(--text)",
          }}
        >
          {title}
        </h1>

        <p
          className="mt-1"
          style={{
            color: "var(--text2)",
          }}
        >
          Smart Transport Operations Platform
        </p>

      </div>

      {buttonText && (
        <PrimaryButton>
          {buttonText}
        </PrimaryButton>
      )}

    </div>
  );
};

export default PageHeader;