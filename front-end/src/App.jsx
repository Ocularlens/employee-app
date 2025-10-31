import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import "./App.css";
import CreateEmployeePage from "./pages/CreateEmployeePage";
import DashboardPage from "./pages/DashboardPage";
import EmployeePage from "./pages/EmployeePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import UpdateEmployeePage from "./pages/UpdateEmployeePage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/dashboard",
      Component: DashboardPage,
      loader: async () => {
        // console.log("Checking token in loader:", token);
        // if (!token) {
        //   handleAuthError('No token found, redirecting to login');
        //   return redirect("/login");
        // }
        // return null;
      },
      children: [
        {
          index: true,
          Component: EmployeePage,
        },
        { path: "create", Component: CreateEmployeePage },
        {
          path: "edit/:id",
          Component: UpdateEmployeePage,
        },
      ],
    },
    { path: "/login", Component: LoginPage },
    {
      path: "*",
      Component: NotFoundPage,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
