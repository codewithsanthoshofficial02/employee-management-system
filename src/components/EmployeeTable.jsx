
// // EmployeeTable.jsx
// // Presentational table that renders employee rows with edit/delete callbacks.
// function EmployeeTable({ employees, onEdit, onDelete }) {
//   if (employees.length === 0) {
//     return <p className="emp-table-empty">No employees found.</p>;
//   }

//   return (
//     <div className="emp-table-wrap">
//       <table className="emp-table">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Department</th>
//             <th>Designation</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {employees.map((emp) => (
//             <tr key={emp.id}>
//               <td className="emp-name-cell">{emp.name}</td>
//               <td>{emp.email}</td>
//               <td>{emp.department}</td>
//               <td>{emp.designation}</td>
//               <td>
//                 <span
//                   className={
//                     "emp-status-pill " +
//                     (emp.status === "Active" ? "is-active" : "is-inactive")
//                   }
//                 >
//                   {emp.status}
//                 </span>
//               </td>
//               <td>
//                 <div className="emp-actions-cell">
//                   <button
//                     className="emp-btn-edit"
//                     onClick={() => onEdit(emp.id)}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="emp-btn-delete"
//                     onClick={() => onDelete(emp.id)}
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default EmployeeTable;

// EmployeeTable.jsx
// Presentational table that renders employee rows with edit/delete callbacks.

function EmployeeTable({ employees, onEdit, onDelete }) {
  if (employees.length === 0) {
    return <p className="emp-table-empty">No employees found.</p>;
  }

  return (
    <div className="emp-table-wrap">
      <table className="emp-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>
                <div className="emp-name-cell">
                  <span className="emp-avatar">
                    {emp.name?.charAt(0).toUpperCase() || "?"}
                  </span>
                  <div className="emp-name-info">
                    <span className="emp-name-text">{emp.name}</span>
                    <span className="emp-email-text">{emp.email}</span>
                  </div>
                </div>
              </td>
              <td>{emp.department}</td>
              <td>{emp.designation}</td>
              <td>
                <span
                  className={
                    "emp-status-pill " +
                    (emp.status === "Active" ? "is-active" : "is-inactive")
                  }
                >
                  {emp.status}
                </span>
              </td>
              <td>
                <div className="emp-actions-cell">
                  <button className="emp-btn-edit" onClick={() => onEdit(emp.id)}>
                    Edit
                  </button>
                  <button className="emp-btn-delete" onClick={() => onDelete(emp.id)}>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTable;