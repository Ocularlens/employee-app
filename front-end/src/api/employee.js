import http from "../services/http";

export const getEmployees = async (filters) => {
  const { data } = await http.post('/getEmployees', filters);

  return data;
}

export const createEmployee = async (employeeData) => {
  const { data } = await http.post('/employees', employeeData);

  return data;
}