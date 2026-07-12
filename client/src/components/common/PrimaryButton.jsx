const PrimaryButton = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-6 py-3 rounded-xl font-semibold shadow transition hover:scale-105"
      style={{
        background: "#2563eb",
        color: "#fff",
      }}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;