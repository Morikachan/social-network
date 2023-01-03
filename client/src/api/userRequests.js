import { $api } from "./index";

export const userLoginRequest = (data) => $api.post("/users/login", data);

export const userSignupRequest = (data) => $api.post("/users/signup", data);

export const checkAuthRequest = () => $api.get("/users/checkAuth")

export const createPostRequest = (text) => $api.post("/users/createPost", {text})

export const getPostsRequest = () => $api.get("/users/getPosts")