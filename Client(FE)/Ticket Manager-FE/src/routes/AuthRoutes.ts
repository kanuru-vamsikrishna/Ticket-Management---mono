// api/auth.ts
import axios from "axios";

export const loginApi = async (payload: { email: string; password: string }) => {
  const { data } = await axios.post("/api/login", payload); 
  return data;
};
