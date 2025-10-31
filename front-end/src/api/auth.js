import http from "../services/http";

export const login = async (credentials) => {
  const { data } = await http.post('/auth/login', credentials);
  return data;
}