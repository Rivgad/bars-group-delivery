import axios from "axios";

const register = (username, email, password) => {
  return axios.post("signup", {
    username,
    email,
    password,
  });
};
const login = (username, password) => {
  return axios
    .post("signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("token", JSON.stringify(response.data));
      }
      return response.data;
    });
};
const logout = () => {
  localStorage.removeItem("token");
};
const authService = {
  register,
  login,
  logout,
};

export default authService;