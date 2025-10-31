import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { getEmployees } from "../api/employee";
import EmployeeTable from "../components/EmployeeTable";

export default function EmployeePage() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState();
  const [page, setPage] = useState(1);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      const data = await getEmployees({});
      setEmployees(data.employees);
    };
    fetchEmployees();
  }, [deleted]);

  return (
    <div>
      <Button
        onClick={() => {
          navigate("create");
        }}
      >
        Add Employee
      </Button>
      <br />
      <div>
        <EmployeeTable employees={employees} setDeleted={setDeleted}/>
        <div>
          <Button>Prev</Button>
          <Button>Next</Button>
        </div>
      </div>
    </div>
  );
}
