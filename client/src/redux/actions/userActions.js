import { SET_USER } from "../types/userTypes";
import { userSignupRequest, userLoginRequest } from "../../api/userRequests";

const setUser = (user, isLoggedIn) => ({
  type: SET_USER,
  payload: {
    user,
    isLoggedIn,
  },
});

export const userSignup = (data) => (dispatch) => {
  userSignupRequest(data).then((res) => {
    console.log(res.data);
    localStorage.setItem("token", res.data.token);
    dispatch(setUser(res.data.user, true));
  });
  // request
};

export const userLogin = (data) => (dispatch) => {
  // request

  userLoginRequest(data).then((res) => {
    localStorage.setItem("token", res.data.token);
    dispatch(setUser(res.data.user, true));
  });
};

export const userLogout = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch(setUser(null, false));
};
