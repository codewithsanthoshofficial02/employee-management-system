// Layout.jsx
// Shared page shell: Sidebar + Topbar + content area.
// Every protected view renders inside this instead of hand-rolling its own shell.

// import Sidebar from "./Sidebar";
// import Topbar from "./Topbar";
// import "./Layout.css";

// function Layout({ title, subtitle, actions, children }) {
//   return (
//     <div className="layout-shell">
//       <Sidebar />
//       <div className="layout-body">
//         <Topbar title={title} subtitle={subtitle} actions={actions} />
//         <main className="layout-content">{children}</main>
//       </div>
//     </div>
//   );
// }

// export default Layout;

// Layout.jsx
// Shared page shell: Navbar on top, content below.

import Navbar from "./Navbar";
import "./Layout.css";

function Layout({ title, actions, children }) {
  return (
    <div className="layout-shell">
      <Navbar />
      <main className="layout-content">
        {(title || actions) && (
          <div className="layout-page-head">
            {title && <h1>{title}</h1>}
            {actions && <div className="layout-page-actions">{actions}</div>}
          </div>
        )}
        {children}
      </main>
    </div>
  );
}

export default Layout;