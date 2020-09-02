import axios from 'axios';

// // hand error usingaxios.interceptros
// axios.defaults.headers = {
//   'Content-type': 'application/json',
//   Authorization: 'Bearer',
// };

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};
