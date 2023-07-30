import './App.css';
import Home from '../src/container/home/Home';
import Login from "../src/container/auth/Login";
import Signup from "../src/container/auth/Signup";
import ChangePassword from "../src/container/changePwd/ChangePassword";
import Profile from "../src/container/profile/profile";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Routes, Route, Navigate, useLocation } from "react-router";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        text: {
          fontWeight: "600 !important",
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#407BFF",
    },
  },
});


function App() {
  let location = useLocation();
  return (
    <>
        {location.pathname === "/" && (
          <Navigate to="/login" replace />
        )}
        <Routes>
          <Route element={<Login />} path="/login" />
          <Route element={<Signup />} path="/signup" />
          <Route element={<Home />} path="/home" />
          <Route element={<ChangePassword />} path="/setting" />
          <Route element={<Profile />} path="/profile" />
        </Routes>
        <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
    </>
  );
}

export default App;
