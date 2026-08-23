
// DashboardView.jsx
// Landing page after login; shows employee summary stats and quick navigation.
// import { useNavigate, Link, useLocation } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import { useEmployees } from "../../context/EmployeeContext";
// import "./DashboardView.css";

// function DashboardView() {
//   const { logout } = useAuth();
//   const { employees } = useEmployees();
//   const navigate = useNavigate();
//   const location = useLocation();

//   function handleLogout() {
//     logout();
//     navigate("/", { replace: true });
//   }

//   const total = employees.length;
//   const active = employees.filter((emp) => emp.status === "Active").length;
//   const inactive = employees.filter((emp) => emp.status === "Inactive").length;

//   const departmentCounts = employees.reduce((acc, emp) => {
//     acc[emp.department] = (acc[emp.department] || 0) + 1;
//     return acc;
//   }, {});

//   // Share is calculated against the total, so the number/bar never
//   // "overflows" no matter how large one department gets — it's always
//   // a value between 0-100%.
//   const departmentRows = Object.entries(departmentCounts)
//     .map(([dept, count]) => ({
//       dept,
//       count,
//       share: total ? Math.round((count / total) * 100) : 0,
//     }))
//     .sort((a, b) => b.count - a.count);

//   const recentEmployees = [...employees]
//     .sort((a, b) => b.id - a.id)
//     .slice(0, 5);

//   const navItems = [
//     { label: "Dashboard", path: "/dashboard" },
//     { label: "Employees", path: "/employees" },
//   ];

//   return (
//     <div className="dash-shell">
//       {/* Sidebar */}
//       <aside className="dash-sidebar">
//         <div className="dash-brand">Employee Portal</div>

//         <nav className="dash-nav">
//           {navItems.map((item) => (
//             <Link
//               key={item.path}
//               to={item.path}
//               className={
//                 "dash-nav-link" +
//                 (location.pathname === item.path ? " active" : "")
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
//             <h1>Dashboard</h1>
//             <p>Overview of your workforce.</p>
//           </div>
//           <Link to="/employees/add" className="dash-primary-btn">
//             + Add employee
//           </Link>
//         </div>

//         {/* Stat cards */}
//         <div className="dash-stats">
//           <div className="stat-card">
//             <span className="stat-label">Total Employees</span>
//             <span className="stat-value">{total}</span>
//           </div>
//           <div className="stat-card">
//             <span className="stat-label">Active</span>
//             <span className="stat-value stat-active">{active}</span>
//           </div>
//           <div className="stat-card">
//             <span className="stat-label">Inactive</span>
//             <span className="stat-value stat-inactive">{inactive}</span>
//           </div>
//         </div>

//         <div className="dash-grid">
//           {/* Department breakdown — table, not growing bars */}
//           <section className="dash-card">
//             <div className="dash-card-head">
//               <h2 className="dash-card-title">Departments</h2>
//               <span className="dash-card-sub">{departmentRows.length} total</span>
//             </div>

//             {departmentRows.length === 0 ? (
//               <p className="dash-empty">No employees added yet.</p>
//             ) : (
//               <div className="dept-table-wrap">
//                 <table className="dept-table">
//                   <thead>
//                     <tr>
//                       <th>Department</th>
//                       <th>Employees</th>
//                       <th>Share</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {departmentRows.map((row) => (
//                       <tr key={row.dept}>
//                         <td className="dept-name-cell">{row.dept}</td>
//                         <td className="dept-count-cell">{row.count}</td>
//                         <td>
//                           <div className="dept-share-cell">
//                             <div className="dept-mini-track">
//                               <div
//                                 className="dept-mini-fill"
//                                 style={{ width: `${row.share}%` }}
//                               />
//                             </div>
//                             <span className="dept-share-value">
//                               {row.share}%
//                             </span>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </section>

//           {/* Recently added */}
//           <section className="dash-card">
//             <div className="dash-card-head">
//               <h2 className="dash-card-title">Recently added</h2>
//             </div>

//             {recentEmployees.length === 0 ? (
//               <p className="dash-empty">No employees added yet.</p>
//             ) : (
//               <ul className="recent-list">
//                 {recentEmployees.map((emp) => (
//                   <li className="recent-row" key={emp.id}>
//                     <div className="recent-avatar">
//                       {emp.name?.charAt(0).toUpperCase() || "?"}
//                     </div>
//                     <div className="recent-info">
//                       <span className="recent-name">{emp.name}</span>
//                       <span className="recent-dept">{emp.department}</span>
//                     </div>
//                     <span
//                       className={
//                         "recent-status " +
//                         (emp.status === "Active" ? "is-active" : "is-inactive")
//                       }
//                     >
//                       {emp.status}
//                     </span>
//                   </li>
//                 ))}
//               </ul>
//             )}

//             <Link to="/employees" className="dash-view-all">
//               View all employees →
//             </Link>
//           </section>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default DashboardView;


// DashboardView.jsx
// Landing page after login; shows employee summary stats and quick navigation.

import { useEmployees } from "../../context/EmployeeContext";
import Layout from "../../components/Layout";
import "./DashboardView.css";

const TAG_COLORS = {
  Engineering: "tag-blue",
  Design: "tag-purple",
  Sales: "tag-red",
  Marketing: "tag-green",
  HR: "tag-orange",
  Operations: "tag-teal",
};

function tagClass(dept) {
  return TAG_COLORS[dept] || "tag-gray";
}

function formatDate(id) {
  // Employee ids are Date.now() timestamps — use as a stand-in "added on" date.
  return new Date(id).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function DashboardView() {
  const { employees } = useEmployees();

  const total = employees.length;
  const active = employees.filter((emp) => emp.status === "Active").length;
  const inactive = employees.filter((emp) => emp.status === "Inactive").length;

  const departmentCounts = employees.reduce((acc, emp) => {
    const dept = emp.department?.trim() || "Unassigned";
    acc[dept] = (acc[dept] || 0) + 1;
    return acc;
  }, {});

  const departmentRows = Object.entries(departmentCounts).sort((a, b) => b[1] - a[1]);

  const recentEmployees = [...employees].sort((a, b) => b.id - a.id).slice(0, 5);

  return (
    <Layout title="Overview">
      <div className="dash-stats">
        <div className="stat-card stat-card-neutral">
          <span className="stat-label">Total Employees</span>
          <span className="stat-value">{total}</span>
        </div>
        <div className="stat-card stat-card-active">
          <span className="stat-label">Active</span>
          <span className="stat-value">{active}</span>
        </div>
        <div className="stat-card stat-card-inactive">
          <span className="stat-label">Inactive</span>
          <span className="stat-value">{inactive}</span>
        </div>
      </div>

      <div className="dash-grid">
        <section className="dash-card">
          <h2 className="dash-card-title">Departments</h2>

          {departmentRows.length === 0 ? (
            <p className="dash-empty">No employees added yet.</p>
          ) : (
            <div className="dept-columns">
              {departmentRows.map(([dept, count]) => (
                <div className="dept-row" key={dept}>
                  <span className="dept-name">{dept}</span>
                  <span className="dept-count">{count}</span>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="dash-card">
          <h2 className="dash-card-title">Recently added</h2>

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
                    <span className="recent-role">{emp.designation || emp.department}</span>
                  </div>
                  <div className="recent-meta">
                    <span className={"recent-tag " + tagClass(emp.department)}>
                      {emp.department}
                    </span>
                    <span className="recent-date">{formatDate(emp.id)}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </Layout>
  );
}

export default DashboardView;