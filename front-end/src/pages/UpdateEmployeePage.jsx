import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { getEmployeedById } from "../api/employee";
import EmployeeForm from "../components/EmployeeForm";

export default function CreateEmployeePage() {
  const [employee, setEmployee] = useState(null);

  const location = useLocation();
  const currentPath = location.pathname.split("/")[3];

  useEffect(() => {
    const fetchEmployee = async () => {
      const data = await getEmployeedById(currentPath);
      setEmployee(data.employee);
    };
    fetchEmployee();
  }, [currentPath]);

  return (
    <div className="form-container">
      <EmployeeForm employee={employee}/>
    </div>
  );
}
