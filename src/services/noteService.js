import axios from 'axios';

const baseUrl = '/api/notes';

<<<<<<< HEAD
=======
let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

>>>>>>> newstuff/main
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

<<<<<<< HEAD
const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
=======
const create = async (newObject) => {
  const config = { headers: { Authorization: token } };

  const response = await axios.post(baseUrl, newObject, config);

  return response.data;
>>>>>>> newstuff/main
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

<<<<<<< HEAD
export default { getAll, create, update };
=======
export default { getAll, create, update, setToken };
>>>>>>> newstuff/main
