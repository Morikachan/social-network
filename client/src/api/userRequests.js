import { $api } from "./index";

export const userLoginRequest = (data) => $api.post("/users/login", data);

export const userSignupRequest = (data) => $api.post("/users/signup", data);
