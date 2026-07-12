import { FaSearch } from "react-icons/fa";

const SearchBar = ({ value, onChange, placeholder }) => {
  return (
    <div className="relative w-80">
      <FaSearch className="absolute left-3 top-3 text-gray-400" />

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
      />
    </div>
  );
};

export default SearchBar;