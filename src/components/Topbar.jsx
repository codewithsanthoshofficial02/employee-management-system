// Topbar.jsx
// Persistent header: page title/subtitle on the left, account menu on the right.

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ChevronDownIcon, LogoutIcon } from "./icons/icon";
import "./Topbar.css";

function Topbar({ title, subtitle, actions }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
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
    <header className="topbar">
      <div className="topbar-titles">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>

      <div className="topbar-actions">
        {actions}

        <div className="topbar-account" ref={menuRef}>
          <button
            className="topbar-account-btn"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
          >
            <span className="topbar-avatar">A</span>
            <span className="topbar-account-name">Admin</span>
            <ChevronDownIcon />
          </button>

          {menuOpen && (
            <div className="topbar-menu" role="menu">
              <button
                className="topbar-menu-item"
                role="menuitem"
                onClick={handleLogout}
              >
                <LogoutIcon />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Topbar;