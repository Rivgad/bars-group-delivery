import axios from "axios";

const auth = (phone, password) => {
  return axios
    .post("/api/auth", { phone, password })
    .then((request) => {
      if (request.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(request.data));
      }
      return request.data;
    })
    .catch((error) => { throw Error(error) } )
  };


const logout = () => {
  localStorage.removeItem("user");
};
const authService = {
  auth,
  logout,
};

export default authService;