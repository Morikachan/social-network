import axios from "axios";

const serverURL = "http://localhost:5001";

const $api = axios.create({
  baseURL: `${serverURL}/api`,
});

export { $api, serverURL };
