
// employeeService.js
// Handles employee data persistence via localStorage (CRUD operations).

const STORAGE_KEY = "employees";

function getAll() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveAll(employees) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
}

function add(employee) {
  const employees = getAll();
  const newEmployee = { ...employee, id: Date.now() }; // simple unique id
  employees.push(newEmployee);
  saveAll(employees);
  return newEmployee;
}

function update(id, updatedData) {
  const employees = getAll();
  const index = employees.findIndex((emp) => emp.id === Number(id));
  if (index === -1) return null;
  employees[index] = { ...employees[index], ...updatedData };
  saveAll(employees);
  return employees[index];
}

function remove(id) {
  const employees = getAll();
  const filtered = employees.filter((emp) => emp.id !== Number(id));
  saveAll(filtered);
}

function getById(id) {
  const employees = getAll();
  return employees.find((emp) => emp.id === Number(id));
}

export default { getAll, add, update, remove, getById };