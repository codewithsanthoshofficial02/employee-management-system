// SearchBar.jsx
// Controlled input for filtering the employee list by name/department.

// function SearchBar({ value, onChange }) {
//   return (
//     <input
//       type="text"
//       placeholder="Search by name or department..."
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       style={{ padding: 8, width: "300px", marginBottom: 16 }}
//     />
//   );
// }

// export default SearchBar;

// SearchBar.jsx
// Controlled input for filtering the employee list by name/department.
function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      className="search-input"
      placeholder="Search by name or department..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default SearchBar;



