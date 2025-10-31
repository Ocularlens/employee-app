import http from "../services/http";

export const getEmployees = async (filters) => {
  const { data } = await http.post('/getEmployees', filters);

  return data;
}

export const createEmployee = async (employeeData) => {
  const { data } = await http.post('/employees', employeeData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
}

export const getEmployeedById = async (id) => {
  const { data } = await http.post(`/employees/${id}`);

  return data;
}

export const updateEmployeeById = async (id, employeeData) => {
  const { data } = await http.put(`/employees/${id}`, employeeData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
}

export const deleteEmployeeById = async (id) => {
  const { data } = await http.delete(`/employees/${id}`);

  return data;
}