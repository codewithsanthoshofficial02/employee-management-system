// DashboardView.jsx
// Landing page after login; shows employee summary stats and quick navigation.

// import { useNavigate, Link } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// // import { useEmployees } from "../viewmodels/useEmployees";
// import { useEmployees } from "../../context/EmployeeContext";

// function DashboardView() {
//   const { logout } = useAuth();
//   const { employees } = useEmployees();
//   const navigate = useNavigate();

//   function handleLogout() {
//     logout();
//     navigate("/");
//   }

//   const total = employees.length;
//   const active = employees.filter((emp) => emp.status === "Active").length;
//   const inactive = employees.filter((emp) => emp.status === "Inactive").length;


//   // Department-wise count
//   const departmentCounts = employees.reduce((acc, emp) => {
//     acc[emp.department] = (acc[emp.department] || 0) + 1;
//     return acc;
//   }, {});




//   return (

//     <div style={{ padding: 20 }}>
    
//     {/* Logout */}
//       <div style={{ display: "flex", justifyContent: "space-between" }}>
//         <h2>Dashboard</h2>
//         <button onClick={handleLogout}>Logout</button>
//       </div>

//     {/* Total Employees */}
//       <div style={{ display: "flex", gap: 16, marginTop: 20 }}>
//         <div style={{ border: "1px solid #ccc", padding: 16, borderRadius: 8 }}>
//           <h4>Total Employees</h4>
//           <p style={{ fontSize: 24 }}>{total}</p>
//         </div>

//     {/* Active */}
//         <div style={{ border: "1px solid #ccc", padding: 16, borderRadius: 8 }}>
//           <h4>Active</h4>
//           <p style={{ fontSize: 24 }}>{active}</p>
//         </div>
    
//     {/* Inactive */}
//         <div style={{ border: "1px solid #ccc", padding: 16, borderRadius: 8 }}>
//           <h4>Inactive</h4>
//           <p style={{ fontSize: 24 }}>{inactive}</p>
//         </div>
//       </div>

//     {/* Department-wise count */}
//     <div style={{ marginTop: 20 }}>
//         <h4>Department-wise count</h4>
//         <ul>
//           {Object.entries(departmentCounts).map(([dept, count]) => (
//             <li key={dept}>{dept}: {count}</li>
//           ))}
//         </ul>
//       </div>

//       <div style={{ marginTop: 20 }}>
//         <Link to="/employees">View All Employees →</Link>
//       </div>
//     </div>
//   );
// }

// export default DashboardView;


// DashboardView.jsx
// Landing page after login; shows employee summary stats and quick navigation.
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEmployees } from "../../context/EmployeeContext";
import "./DashboardView.css";

function DashboardView() {
  const { logout } = useAuth();
  const { employees } = useEmployees();
  const navigate = useNavigate();
  const location = useLocation();

  function handleLogout() {
    logout();
    navigate("/", { replace: true });
  }

  const total = employees.length;
  const active = employees.filter((emp) => emp.status === "Active").length;
  const inactive = employees.filter((emp) => emp.status === "Inactive").length;

  const departmentCounts = employees.reduce((acc, emp) => {
    acc[emp.department] = (acc[emp.department] || 0) + 1;
    return acc;
  }, {});

  // Share is calculated against the total, so the number/bar never
  // "overflows" no matter how large one department gets — it's always
  // a value between 0-100%.
  const departmentRows = Object.entries(departmentCounts)
    .map(([dept, count]) => ({
      dept,
      count,
      share: total ? Math.round((count / total) * 100) : 0,
    }))
    .sort((a, b) => b.count - a.count);

  const recentEmployees = [...employees]
    .sort((a, b) => b.id - a.id)
    .slice(0, 5);

  const navItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Employees", path: "/employees" },
  ];

  return (
    <div className="dash-shell">
      {/* Sidebar */}
      <aside className="dash-sidebar">
        <div className="dash-brand">Employee Portal</div>

        <nav className="dash-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={
                "dash-nav-link" +
                (location.pathname === item.path ? " active" : "")
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
            <h1>Dashboard</h1>
            <p>Overview of your workforce.</p>
          </div>
          <Link to="/employees/add" className="dash-primary-btn">
            + Add employee
          </Link>
        </div>

        {/* Stat cards */}
        <div className="dash-stats">
          <div className="stat-card">
            <span className="stat-label">Total Employees</span>
            <span className="stat-value">{total}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Active</span>
            <span className="stat-value stat-active">{active}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Inactive</span>
            <span className="stat-value stat-inactive">{inactive}</span>
          </div>
        </div>

        <div className="dash-grid">
          {/* Department breakdown — table, not growing bars */}
          <section className="dash-card">
            <div className="dash-card-head">
              <h2 className="dash-card-title">Departments</h2>
              <span className="dash-card-sub">{departmentRows.length} total</span>
            </div>

            {departmentRows.length === 0 ? (
              <p className="dash-empty">No employees added yet.</p>
            ) : (
              <div className="dept-table-wrap">
                <table className="dept-table">
                  <thead>
                    <tr>
                      <th>Department</th>
                      <th>Employees</th>
                      <th>Share</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departmentRows.map((row) => (
                      <tr key={row.dept}>
                        <td className="dept-name-cell">{row.dept}</td>
                        <td className="dept-count-cell">{row.count}</td>
                        <td>
                          <div className="dept-share-cell">
                            <div className="dept-mini-track">
                              <div
                                className="dept-mini-fill"
                                style={{ width: `${row.share}%` }}
                              />
                            </div>
                            <span className="dept-share-value">
                              {row.share}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          {/* Recently added */}
          <section className="dash-card">
            <div className="dash-card-head">
              <h2 className="dash-card-title">Recently added</h2>
            </div>

            {recentEmployees.length === 0 ? (
              <p className="dash-empty">No employees added yet.</p>
            ) : (
              <ul className="recent-list">
                {recentEmployees.map((emp) => (
                  <li className="recent-row" key={emp.id}>
                    <div className="recent-avatar">
                      {emp.name?.charAt(0).toUpperCase() || "?"}
                    </div>
                    <div className="recent-info">
                      <span className="recent-name">{emp.name}</span>
                      <span className="recent-dept">{emp.department}</span>
                    </div>
                    <span
                      className={
                        "recent-status " +
                        (emp.status === "Active" ? "is-active" : "is-inactive")
                      }
                    >
                      {emp.status}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            <Link to="/employees" className="dash-view-all">
              View all employees →
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
}

export default DashboardView;