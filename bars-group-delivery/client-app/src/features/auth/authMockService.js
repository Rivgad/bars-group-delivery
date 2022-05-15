
const register = (phone, password) => {
  return {};
};
const login = (phone, password) => {

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (phone === '79393374139' && password === '123') {
        let data = {
          id: 1,
          accessToken: 'token123',
          name: 'Адель',
          phone: '79393374139',
          role: 'ROLE_USER',
          addresses: [
            { id: 1, street: 'Гаврилова', city: 'Казань' },
            { id: 2, street: 'Гаврилова', city: 'Казань', house: 10, flat: 31 },
          ]
        }
        localStorage.setItem('user', JSON.stringify(data));
        resolve(data);
      }
      else {
        reject();
      }
    }, 1000);
  });
};
const logout = () => {
  localStorage.removeItem("user");
};
const authService = {
  register,
  login,
  logout,
};

export default authService;