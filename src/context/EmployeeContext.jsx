// EmployeeContext.jsx
// App-wide employee data and CRUD operations, single source of truth.

import { createContext, useContext, useState, useEffect } from "react";
import employeeService from "../services/employeeService";

const EmployeeContext = createContext();

export function EmployeeProvider({ children }) {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    setEmployees(employeeService.getAll());
  }, []);

  function addEmployee(employee) {
    const newEmp = employeeService.add(employee);
    setEmployees((prev) => [...prev, newEmp]);
  }

  function updateEmployee(id, updatedData) {
    const updated = employeeService.update(id, updatedData);

    if (!updated) return;
    
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === Number(id) ? updated : emp))
    );
  }

  function deleteEmployee(id) {
    employeeService.remove(id);
    setEmployees((prev) => prev.filter((emp) => emp.id !== Number(id)));
  }

  return (
    <EmployeeContext.Provider
      value={{ employees, addEmployee, updateEmployee, deleteEmployee }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}

export function useEmployees() {
  return useContext(EmployeeContext);
}