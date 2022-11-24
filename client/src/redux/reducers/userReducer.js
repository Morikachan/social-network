const { SET_USER } = require("../types/userTypes");

const initialValues = {
  user: {},
  errors: {},
  isLoggedIn: false,
};

const userReducer = (state = initialValues, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload.user,
        isLoggedIn: action.payload.isLoggedIn,
      };

    default:
      return state;
  }
};

export default userReducer;
