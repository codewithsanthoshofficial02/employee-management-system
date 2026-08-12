// AddEmployeeView.jsx
// Form screen to create a new employee record.

// import { useNavigate } from "react-router-dom";
// import { useEmployees } from "../../context/EmployeeContext";
// import EmployeeForm from "../../components/EmployeeForm";

// function AddEmployeeView() {
//   const { addEmployee } = useEmployees();
//   const navigate = useNavigate();

//   function handleAdd(formData) {
//     addEmployee(formData);
//     //navigate("/employees", { replace: true });
//     navigate(-1);
//   }

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Add Employee</h2>
//       <EmployeeForm 
//      // initialData={existingEmployee}
//       onSubmit={handleAdd} 
//       submitLabel="Add Employee" />
//     </div>
//   );
// }

// export default AddEmployeeView;


import { useNavigate } from "react-router-dom";
import { useEmployees } from "../../context/EmployeeContext";
import EmployeeForm from "../../components/EmployeeForm";
import "./EmployeeFormPage.css";

function AddEmployeeView() {
  const { addEmployee } = useEmployees();
  const navigate = useNavigate();

  function handleAdd(formData) {
    addEmployee(formData);
    navigate(-1);
  }

  return (
    <div className="emp-page">
      <div className="emp-page-inner">
        <button className="emp-back-link" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div className="emp-card">
          <div className="emp-card-header">
            <h1>Add employee</h1>
            <p>Enter the details below to create a new employee record.</p>
          </div>

          <EmployeeForm
            onSubmit={handleAdd}
            submitLabel="Add employee"
            onCancel={() => navigate(-1)}
          />
        </div>
      </div>
    </div>
  );
}

export default AddEmployeeView;