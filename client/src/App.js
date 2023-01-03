import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import SingUp from "./pages/SignUp";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuth } from "./redux/actions/userActions";

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(checkAuth())
  })


  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SingUp />} />


          <Route path='/' element={<ProtectedRoute/>}>
            <Route path="profile" element={<Profile />} />

          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
