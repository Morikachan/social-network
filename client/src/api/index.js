import axios from "axios";

const serverURL = "http://localhost:5001";

const $api = axios.create({
  baseURL: `${serverURL}/api`,
});

$api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if(token) {
    config.headers.authorization = `Bearer ${token}`
  }
  return config
})

export { $api, serverURL };
