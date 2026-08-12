// EditEmployeeView.jsx
// Form screen to update an existing employee record, pre-filled with current data.

import { useNavigate, useParams } from "react-router-dom";
import { useEmployees } from "../../context/EmployeeContext";
import EmployeeForm from "../../components/EmployeeForm";
import employeeService from "../../services/employeeService";

function EditEmployeeView() {
  const { id } = useParams();
  const { employees, updateEmployee } = useEmployees();
  const navigate = useNavigate();

//   const existingEmployee = employeeService.getById(id);
     const existingEmployee = employees.find(
  (emp) => emp.id === Number(id)
);

  function handleUpdate(formData) {
    updateEmployee(id, formData);
    //navigate("/employees", { replace: true });
    navigate(-1);
  }

  if (!existingEmployee) {
    return <p>Employee not found.</p>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Edit Employee</h2>
      <EmployeeForm
        initialData={existingEmployee}
        onSubmit={handleUpdate}
        submitLabel="Update Employee"
      />
    </div>
  );
}

export default EditEmployeeView;



// import { useNavigate, useParams } from "react-router-dom";
// import { useEmployees } from "../../context/EmployeeContext";
// import EmployeeForm from "../../components/EmployeeForm";
// import "./EmployeeFormPage.css";

// function EditEmployeeView() {
//   const { id } = useParams();
//   const { employees, updateEmployee } = useEmployees();
//   const navigate = useNavigate();

//   const existingEmployee = employees.find((emp) => emp.id === Number(id));

//   function handleUpdate(formData) {
//     updateEmployee(id, formData);
//     navigate(-1);
//   }

//   return (
//     <div className="emp-page">
//       <div className="emp-page-inner">
//         <button className="emp-back-link" onClick={() => navigate(-1)}>
//           ← Back
//         </button>

//         {!existingEmployee ? (
//           <div className="emp-not-found">Employee not found.</div>
//         ) : (
//           <div className="emp-card">
//             <div className="emp-card-header">
//               <h1>Edit employee</h1>
//               <p>Update {existingEmployee.name}&apos;s details below.</p>
//             </div>

//             <EmployeeForm
//               initialData={existingEmployee}
//               onSubmit={handleUpdate}
//               submitLabel="Save changes"
//               onCancel={() => navigate(-1)}
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default EditEmployeeView;