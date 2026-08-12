// App.jsx
// Defines all application routes and wires up route guards.

import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginView from "./views/Login/LoginView";
import DashboardView from "./views/Dashboard/DashboardView";
import EmployeeListView from "./views/Employees/EmployeeListView";
import AddEmployeeView from "./views/Employees/AddEmployeeView";
import EditEmployeeView from "./views/Employees/EditEmployeeView";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <PublicRoute> <LoginView /></PublicRoute>} />
        <Route
          path="/dashboard"
          element={ <ProtectedRoute> <DashboardView /> </ProtectedRoute> } 
         />

        <Route
          path="/employees"
          element={ <ProtectedRoute> <EmployeeListView /> </ProtectedRoute> } 
         />

        <Route
          path="/employees/add"
          element={ <ProtectedRoute> <AddEmployeeView /> </ProtectedRoute> } 
         />
        
        <Route
          path="/employees/edit/:id"
          element={ <ProtectedRoute> <EditEmployeeView /> </ProtectedRoute> } 
         />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
