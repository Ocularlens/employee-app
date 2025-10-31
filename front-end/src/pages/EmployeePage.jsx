import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { getEmployees } from "../api/employee";
import EmployeeTable from "../components/EmployeeTable";
import SearchBox from "../components/Search";
import SizeDropdown from "../components/SizeDropdown";

export default function EmployeePage() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState();
  const [page, setPage] = useState(1);
  const [deleted, setDeleted] = useState(false);
  const [size, setSize] = useState(5);
  const [query, setQuery] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [sort, setSort] = useState({ orderBy: "id", order: "asc" });

  useEffect(() => {
    const fetchEmployees = async () => {
      let searchKeyword = query === "" ? undefined : query;

      const data = await getEmployees({
        size,
        page,
        searchKeyword,
        order: sort.order,
        field: sort.orderBy,
      });
      setEmployees(data.employees);
      setTotalPages(data.pagination.totalPages);
    };
    fetchEmployees();
  }, [deleted, size, page, query, sort]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

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
      <div className="input-container">
        <SizeDropdown setSize={setSize} size={size} />
        <SearchBox query={query} setQuery={setQuery} />
      </div>
      <div className="table-container">
        <EmployeeTable
          employees={employees}
          setDeleted={setDeleted}
          setSort={setSort}
        />
        <div className="pagination-controls">
          <Button
            disabled={page <= 1}
            onClick={() => {
              handlePageChange(page - 1);
            }}
          >
            Prev
          </Button>
          <Button
            disabled={page >= totalPages}
            onClick={() => {
              handlePageChange(page + 1);
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
