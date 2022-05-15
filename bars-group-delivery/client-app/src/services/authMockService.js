const Users = [
  {
    id: 1,
    accessToken: 'token1',
    name: 'Адель',
    phone: '79393374139',
    password: '123',
    role: 'ROLE_USER',
    addresses: [
      { id: 1, street: 'Гаврилова', city: 'Казань' },
      { id: 2, street: 'Гаврилова', city: 'Казань', house: 10, flat: 31 },
    ]
  },
  {
    id: 2,
    accessToken: 'token2',
    name: 'User 2',
    phone: '79393374138',
    password: '123',
    role: 'ROLE_USER',
    addresses: [
      { id: 3, street: 'Street1', city: 'Казань' },
      { id: 4, street: 'Гаврилова', city: 'Казань', house: 10, flat: 31 },
    ]
  },
  {
    id: 3,
    accessToken: 'token3',
    name: 'User 3',
    phone: '79393374137',
    password: '123',
    role: 'ROLE_USER',
    addresses: [
      { id: 3, street: 'Street1', city: 'Казань' },
      { id: 4, street: 'Гаврилова', city: 'Казань', house: 10, flat: 31 },
    ]
  }
]


const register = (phone, password) => {
  return {};
};
const login = (phone, password) => {

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let user = Users.find(item => item.phone === phone);
      if (user == null || user?.password !== password) {
        reject();
      }
      delete user.password;
      let data = {...user }
      localStorage.setItem('user', JSON.stringify(data));
      resolve(data);
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