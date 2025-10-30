import { createBrowserRouter, redirect } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import DashboardPage from './pages/DashboardPage'
import EmployeePage from './pages/EmployeePage'
import CreateEmployeePage from './pages/CreateEmployeePage'
import UpdateEmployeePage from './pages/UpdateEmployeePage'
import './App.css'
import checkAuth from './utils/checkAuth'
import LoginPage from './pages/LoginPage'

const router = createBrowserRouter([
  {
    path: '/dashboard',
    Component: DashboardPage,
    loader: async () => {
      // const isLoggedIn = checkAuth();
      // console.log(isLoggedIn)
      // if (!isLoggedIn) return null;

      // return redirect('/login')
    },
    children: [
      {
        index: true, Component: EmployeePage,
        loader: async () => {
          return { records: [{ id: 1, fullName: 'Test', type: 'Type-1' }] }
        }
      },
      { path: 'create', Component: CreateEmployeePage },
      {
        path: 'edit/:id', Component: UpdateEmployeePage
      }
    ]
  },
  { path: '/login', Component: LoginPage }
])


function App() {
  return <RouterProvider router={router} />
}

export default App
