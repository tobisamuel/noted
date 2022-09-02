import axios from "./axios";

type UserDetails = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
};

const signUp = async (data: UserDetails) => {
  const response = await axios.post("/register", data, {
    headers: {
      "Content-Type": "application/json",
      withCredentials: true,
    },
  });

  return response.data
};

export default signUp;
