import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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

const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("token") ? true : false
  );

  useEffect(() => {
    // Periksa apakah token ada di localStorage saat aplikasi dimuat
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    // Implement login logic (e.g., API call, form submission)
    setIsAuthenticated(true); // Update state after successful login
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false); // Update state after logout
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, handleLogin, handleLogout }}
    >
      <div className="App w-screen h-screen">
        <BrowserRouter>
          {/* Always render the main Navbar component */}
          <div className="pages">
            {isAuthenticated ? <NavbarDefault /> : <Navbar />}{" "}
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/Home"
                element={
                  // Protected route with conditional rendering based on authentication state
                  isAuthenticated ? <Home /> : <Navigate to="/login" replace />
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
