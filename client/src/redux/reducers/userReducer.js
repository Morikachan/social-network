const { SET_USER, CREATE_POST, GET_POSTS } = require("../types/userTypes");

const initialValues = {
  user: null,
  errors: {},
  isLoggedIn: false,
  posts: []
};

const userReducer = (state = initialValues, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload.user,
        isLoggedIn: action.payload.isLoggedIn,
      };

    case CREATE_POST: 
      return {...state, posts: [action.payload, ...state.posts]}

    case GET_POSTS:
      return {...state, posts: action.payload}

    default:
      return state;
  }
};

export default userReducer;
