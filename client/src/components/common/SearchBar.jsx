import { FaSearch } from "react-icons/fa";

const SearchBar = ({ placeholder }) => {
  return (
    <div className="relative w-80">

      <FaSearch
        className="absolute left-4 top-3"
        style={{
          color: "var(--text2)",
        }}
      />

      <input
        type="text"
        placeholder={placeholder}
        className="w-full rounded-xl pl-11 pr-4 py-3 border outline-none"
        style={{
          background: "var(--card)",
          color: "var(--text)",
          borderColor: "var(--border)",
        }}
      />

    </div>
  );
};

export default SearchBar;