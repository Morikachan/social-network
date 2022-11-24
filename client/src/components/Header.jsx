import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogout } from "../redux/actions/userActions";

function Header() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.userReducer);
  //   console.log(result);
  const logout = () => {
    dispatch(userLogout());
  };
  return (
    <div>
      <Link to="/">Home page</Link>
      {isLoggedIn ? (
        <>
          <button onClick={logout}>Logout</button>
          <Link to="/profile">Profile</Link>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign up</Link>
        </>
      )}
    </div>
  );
}

export default Header;
