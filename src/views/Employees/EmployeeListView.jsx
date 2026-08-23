// // EmployeeListView.jsx
// // Displays all employees in a searchable table with edit/delete actions.

// import { useState } from "react";
// import { useNavigate, Link, useLocation } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import { useEmployees } from "../../context/EmployeeContext";
// import EmployeeTable from "../../components/EmployeeTable";
// import SearchBar from "../../components/SearchBar";
// import "../Dashboard/DashboardView.css"
// import "./Employeelistview.css";

// function EmployeeListView() {
//   const { logout } = useAuth();
//   const { employees, deleteEmployee } = useEmployees();
//   const [searchTerm, setSearchTerm] = useState("");
//   const navigate = useNavigate();
//   const location = useLocation();

//   const filteredEmployees = employees.filter(
//     (emp) =>
//       emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       emp.department.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   function handleEdit(id) {
//     navigate(`/employees/edit/${id}`);
//   }

//   function handleDelete(id) {
//     if (window.confirm("Are you sure you want to delete this employee?")) {
//       deleteEmployee(id);
//     }
//   }

//   function handleLogout() {
//     logout();
//     navigate("/", { replace: true });
//   }

//   const navItems = [
//     { label: "Dashboard", path: "/dashboard" },
//     { label: "Employees", path: "/employees" },
//   ];

//   return (
//     <div className="dash-shell">
//       {/* Sidebar — same as Dashboard for a consistent shell */}
//       <aside className="dash-sidebar">
//         <div className="dash-brand">Employee Portal</div>

//         <nav className="dash-nav">
//           {navItems.map((item) => (
//             <Link
//               key={item.path}
//               to={item.path}
//               className={
//                 "dash-nav-link" +
//                 (location.pathname.startsWith(item.path) ? " active" : "")
//               }
//             >
//               {item.label}
//             </Link>
//           ))}
//         </nav>

//         <button className="dash-sidebar-logout" onClick={handleLogout}>
//           Logout
//         </button>
//       </aside>

//       {/* Main content */}
//       <main className="dash-main">
//         <div className="dash-headerbar">
//           <div>
//             <h1>Employees</h1>
//             <p>{employees.length} total employees.</p>
//           </div>
//           <button
//             className="dash-primary-btn"
//             onClick={() => navigate("/employees/add")}
//           >
//             + Add employee
//           </button>
//         </div>

//         <div className="emp-list-card">
//           <div className="emp-list-toolbar">
//             <SearchBar value={searchTerm} onChange={setSearchTerm} />
//             {searchTerm && (
//               <span className="emp-list-count">
//                 {filteredEmployees.length} of {employees.length} shown
//               </span>
//             )}
//           </div>

//           <EmployeeTable
//             employees={filteredEmployees}
//             onEdit={handleEdit}
//             onDelete={handleDelete}
//           />
//         </div>
//       </main>
//     </div>
//   );
// }

// export default EmployeeListView;

// EmployeeListView.jsx
// Displays all employees in a searchable, filterable table with edit/delete actions.

import { useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEmployees } from "../../context/EmployeeContext";
import EmployeeTable from "../../components/EmployeeTable";
import Layout from "../../components/Layout";
import "./EmployeeListView.css";

function EmployeeListView() {
  const { employees, deleteEmployee } = useEmployees();
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const navigate = useNavigate();

  const departments = useMemo(() => {
    const unique = new Set(
      employees.map((emp) => emp.department?.trim()).filter(Boolean)
    );
    return ["All", ...Array.from(unique).sort()];
  }, [employees]);

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept =
      departmentFilter === "All" || emp.department === departmentFilter;

    return matchesSearch && matchesDept;
  });

  function handleEdit(id) {
    navigate(`/employees/edit/${id}`);
  }

  function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      deleteEmployee(id);
    }
  }

  return (
    <Layout
      title="Employee Directory"
      actions={
        <button
          className="emp-add-btn"
          onClick={() => navigate("/employees/add")}
        >
          + Add Employee
        </button>
      }
    >
      <div className="emp-list-card">
        <div className="emp-list-toolbar">
          <div className="emp-search-wrap">
            <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
              <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="emp-dept-select"
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept === "All" ? "All Departments" : dept}
              </option>
            ))}
          </select>
        </div>

        <EmployeeTable
          employees={filteredEmployees}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </Layout>
  );
}

export default EmployeeListView;