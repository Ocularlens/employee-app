import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router";
import { deleteEmployeeById } from "../api/employee";
import Carets from "./Carets";

export default function EmployeeTable({ employees, setDeleted, setSort }) {
  const navigate = useNavigate();

  const handleEdit = (employeeId) => {
    navigate(`edit/${employeeId}`);
  };

  const handleDelete = async (employeeId) => {
    const bool = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (bool) {
      await deleteEmployeeById(employeeId);
      setDeleted((prev) => !prev);
    }
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Picture</th>
          <th>
            Fullname
            <Carets field="firstname" setSort={setSort} />
          </th>
          <th>
            Username
            <Carets field="username" setSort={setSort} />
          </th>
          <th>
            Email
            <Carets field="email" setSort={setSort} />
          </th>
          <th>
            Country
            <Carets field="country" setSort={setSort} />
          </th>
          <th>
            Type
            <Carets field="accountType" setSort={setSort} />
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {employees &&
          employees.map((employee) => (
            <tr key={employee.id}>
              <td>
                <img
                  src={`${import.meta.env.VITE_API_URL.replace(
                    "/api",
                    ""
                  )}/images/${employee.photo}`}
                  alt="employee"
                  style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                />
              </td>
              <td>
                {employee.firstname} {employee.lastname}
              </td>
              <td>{employee.username}</td>
              <td>{employee.email}</td>
              <td>{employee.country}</td>
              <td>{employee.accountType}</td>
              <td style={{ display: "flex", gap: "8px" }}>
                <Button
                  onClick={() => handleEdit(employee.id)}
                  variant="warning"
                >
                  <i class="bi bi-pencil"></i>
                </Button>
                <Button
                  onClick={() => handleDelete(employee.id)}
                  variant="danger"
                >
                  <i class="bi bi-trash3"></i>
                </Button>
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
}
