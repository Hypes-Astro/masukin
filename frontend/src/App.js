import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import { NavbarDefault } from "./components/NavbarComponents";

// Consider using a state management library like Redux or Context API
// for more complex authentication scenarios. Here's an example using Context API:

import { createContext, useState, useEffect } from "react";
import LandingPage from "./pages/Landing/Landing";
import Login from "./pages/Login/login";
import Footer from "./components/Footer";
import AccountPage from "./pages/Account/Account";
import NavbarBefore from "./components/Navbar";
import SessionDetail from "./pages/Detail/detailPages";

const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("loggedInUser") ? true : false
  );

  useEffect(() => {
    // Periksa apakah token ada di localStorage saat aplikasi dimuat
    const token = localStorage.getItem("loggedInUser");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     window.location.replace("/home");
  //   }
  // }, [isAuthenticated]);

  const handleLogin = () => {
    setIsAuthenticated(true); // Update state after successful login
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("token");
    setIsAuthenticated(false); // Update state setelah logout
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, handleLogin, handleLogout }}
    >
      <div className="App w-full h-screen">
        <BrowserRouter>
          {/* Always render the main Navbar component */}
          <div className="pages">
            {isAuthenticated ? <NavbarDefault /> : <NavbarBefore />}{" "}
            <Routes>
              <Route
                path="/"
                element={isAuthenticated ? <Home /> : <LandingPage />}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/home"
                element={
                  // Protected route with conditional rendering based on authentication state
                  isAuthenticated ? (
                    <Home />
                  ) : (
                    <Navigate to="/login" replace={true} />
                  )
                }
              />
              <Route 
                path="/session/:id" 
                element={
                  isAuthenticated ? (
                    <SessionDetail />
                  ) : (
                    <Navigate to="/login" replace={true} />
                  )
                } 
              />
              <Route path="/account" element={<AccountPage />} />
            </Routes>
            <Footer />
          </div>
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
