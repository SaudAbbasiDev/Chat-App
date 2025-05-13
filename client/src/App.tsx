import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Profile from "./pages/profile";
import SignUp from "./pages/signup";
import axios from "axios";
import Navbar from "./components/navbar";
import { useAuthStore } from "./components/authstore";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

const App = () => {
  // // Global axios settings
  const { authUser, CheckAuth, isCheckingAuth, Onlineusers } = useAuthStore();
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = "http://localhost:4000/api";

  // Get authUser status from context
  console.log({ Onlineusers });
  useEffect(() => {
    CheckAuth(); // checks token only once at load
  }, [CheckAuth]);
  // toast.success("Hi")

  if (isCheckingAuth) return <div>Loading...</div>; // Wait here ⏳ just once
  // console.log({ hahahahah: authUser });
  return (
    <>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!authUser? <Login />:<Navigate to="/"/>}
        />
        <Route
          path="/signup"
          element={<SignUp />}
        />
        <Route
          path="/profile"
          element={authUser ? <Profile /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
};

export default App;
