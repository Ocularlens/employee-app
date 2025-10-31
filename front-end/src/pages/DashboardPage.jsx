import { useEffect } from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const DEFINED_SUB_PATHS = [
  { key: "create", text: "Add Employee" },
  { key: "edit", text: "Update Employee" },
  { key: "", text: "Dashboard" },
];

export default function DashboardPage() {
  const location = useLocation();
  const currentPath = location.pathname.split("/")[2];
  const pageText = DEFINED_SUB_PATHS.find(
    (val) => val.key === currentPath
  )?.text;
  const isDashboardActive = !pageText;

  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <div className="dashboard-container">
      <div className="breadcrumb-container">
        <Breadcrumb>
          <Breadcrumb.Item
            linkAs={Link}
            linkProps={{ to: "/dashboard" }}
            active={isDashboardActive}
          >
            Dashboard
          </Breadcrumb.Item>
          {pageText && <Breadcrumb.Item active>{pageText}</Breadcrumb.Item>}
        </Breadcrumb>
      </div>
      <hr />
      <Outlet />
    </div>
  );
}
