// EmployeeListView.jsx
// Displays all employees in a searchable table with edit/delete actions.

import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEmployees } from "../../context/EmployeeContext";
import EmployeeTable from "../../components/EmployeeTable";
import SearchBar from "../../components/SearchBar";
//import "../dashboard/DashboardView.css"; // reuses .dash-shell / .dash-sidebar / .dash-nav / .dash-main etc.
import "../Dashboard/DashboardView.css"
import "./EmployeeListView.css";

function EmployeeListView() {
  const { logout } = useAuth();
  const { employees, deleteEmployee } = useEmployees();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleEdit(id) {
    navigate(`/employees/edit/${id}`);
  }

  function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      deleteEmployee(id);
    }
  }

  function handleLogout() {
    logout();
    navigate("/", { replace: true });
  }

  const navItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Employees", path: "/employees" },
  ];

  return (
    <div className="dash-shell">
      {/* Sidebar — same as Dashboard for a consistent shell */}
      <aside className="dash-sidebar">
        <div className="dash-brand">Employee Portal</div>

        <nav className="dash-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={
                "dash-nav-link" +
                (location.pathname.startsWith(item.path) ? " active" : "")
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button className="dash-sidebar-logout" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="dash-main">
        <div className="dash-headerbar">
          <div>
            <h1>Employees</h1>
            <p>{employees.length} total employees.</p>
          </div>
          <button
            className="dash-primary-btn"
            onClick={() => navigate("/employees/add")}
          >
            + Add employee
          </button>
        </div>

        <div className="emp-list-card">
          <div className="emp-list-toolbar">
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
            {searchTerm && (
              <span className="emp-list-count">
                {filteredEmployees.length} of {employees.length} shown
              </span>
            )}
          </div>

          <EmployeeTable
            employees={filteredEmployees}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </main>
    </div>
  );
}

export default EmployeeListView;