// EmployeeForm.jsx
// Shared form UI for both Add and Edit screens; parent decides submit behavior.
import { useState } from "react";
import "./EmployeeForm.css";

function EmployeeForm({ initialData, onSubmit, submitLabel, onCancel }) {
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      email: "",
      phone: "",
      department: "",
      designation: "",
      salary: "",
      status: "Active",
    }
  );

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   onSubmit(formData);
  // }

  function handleSubmit(e) {
  e.preventDefault();
  onSubmit({
    ...formData,
    salary: formData.salary === "" ? "" : Number(formData.salary),
  });
}

  return (
    <form onSubmit={handleSubmit} className="emp-form">
      <div className="emp-form-grid">
        <div className="emp-field">
          <label htmlFor="name">Full name</label>
          <input
            id="name"
            name="name"
            placeholder="e.g. Priya Sharma"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="emp-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="e.g. priya@company.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="emp-field">
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            name="phone"
            placeholder="e.g. 98765 43210"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="emp-field">
          <label htmlFor="department">Department</label>
          <input
            id="department"
            name="department"
            placeholder="e.g. Engineering"
            value={formData.department}
            onChange={handleChange}
            required
          />
        </div>

        <div className="emp-field">
          <label htmlFor="designation">Designation</label>
          <input
            id="designation"
            name="designation"
            placeholder="e.g. Software Engineer"
            value={formData.designation}
            onChange={handleChange}
          />
        </div>

        <div className="emp-field">
          <label htmlFor="salary">Salary</label>
          <input
            id="salary"
            name="salary"
            type="number"
            placeholder="e.g. 60000"
            value={formData.salary}
            onChange={handleChange}
            min="0"
          />
        </div>

        <div className="emp-field emp-field-full">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="emp-form-actions">
        {onCancel && (
          <button
            type="button"
            className="emp-btn-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
        <button type="submit" className="emp-btn-primary">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

export default EmployeeForm;
