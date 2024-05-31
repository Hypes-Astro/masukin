import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useMemberContext } from "../../hooks/useMemberContext";
import { useState } from "react";

// toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { dispatch } = useMemberContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/masukin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        // console.log("kok ", data.member.username);
        localStorage.setItem("loggedInUser", JSON.stringify(data.member));
        dispatch({
          type: "LOGIN_USER",
          payload: { member: data.member, token: data.token },
        });
        navigate("/Home");
        toast.success("Login berhasil!");
        // Lakukan tindakan lain setelah login berhasil (misalnya, redirect ke halaman lain)
      } else {
        console.log("lah", data); // Menambahkan log pesan error
        toast.error(data.message || "Login gagal!");
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
      toast.error("Error occurred during login");
    }
  };

  return (
    <div className="flex items-center justify-center h-[85vh]">
      <Card color="transparent" shadow={false} className="shadow-lg p-5">
        <Typography variant="h4" color="blue-gray">
          Login
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Nice to meet you! Enter your details to Login .
        </Typography>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleLogin}
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Name
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <Button type="submit" className="mt-6" fullWidth>
            log in
          </Button>
          {error && <div className="error"> {error} </div>}

          <Typography color="gray" className="mt-4 text-center font-normal">
            Don't have an account yet?{" "}
            <Link to="/signup" className="font-medium text-gray-900">
              Sign up
            </Link>
          </Typography>
        </form>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </Card>
    </div>
  );
};
export default Login;
