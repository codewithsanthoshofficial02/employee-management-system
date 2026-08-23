// Navbar.jsx
// Top navigation bar: brand, search, notifications, account menu, and page tabs.

import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

const NAV_TABS = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Employees", path: "/employees" },
];

function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleLogout() {
    logout();
    navigate("/", { replace: true });
  }

  return (
    <header className="navbar">
      <div className="navbar-top">
        <div className="navbar-brand">
          <span className="navbar-brand-mark">+</span>
          Company Portal
        </div>

        <div className="navbar-search">
          <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
            <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <input type="text" placeholder="Search" />
        </div>

        <div className="navbar-right">
          <button className="navbar-icon-btn" aria-label="Notifications">
            <svg viewBox="0 0 24 24" fill="none" width="19" height="19">
              <path
                d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M13.7 21a2 2 0 01-3.4 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>

          <div className="navbar-account" ref={menuRef}>
            <button
              className="navbar-account-btn"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
            >
              <span className="navbar-avatar">A</span>
              <span className="navbar-account-name">Admin</span>
              <svg viewBox="0 0 24 24" fill="none" width="14" height="14">
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {menuOpen && (
              <div className="navbar-menu" role="menu">
                <button className="navbar-menu-item" role="menuitem" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <nav className="navbar-tabs">
        {NAV_TABS.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={"navbar-tab" + (isActive ? " active" : "")}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}

export default Navbar;

