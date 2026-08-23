// components/Sidebar.jsx

// Sidebar.jsx
// App-wide navigation. Shared across every protected view via Layout.

import { Link, useLocation } from "react-router-dom";
import { DashboardIcon, EmployeesIcon } from "./icons/icon";
import "./Sidebar.css";

const NAV_ITEMS = [
  { label: "Dashboard", path: "/dashboard", icon: DashboardIcon },
  { label: "Employees", path: "/employees", icon: EmployeesIcon },
];

function Sidebar() {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-brand-mark">EP</div>
        <span>Employee Portal</span>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={"sidebar-link" + (isActive ? " active" : "")}
            >
              <Icon className="sidebar-link-icon" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;