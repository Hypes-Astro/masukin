import { useState } from "react";
import { useMemberContext } from "../hooks/useMemberContext";
import { Input, Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

// toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FormInput = () => {
  const { dispatch } = useMemberContext();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const member = { username, email, password };

    // sesuaikan dengan API
    const response = await fetch("/api/masukin/createmember", {
      method: "POST",
      body: JSON.stringify(member),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }

    if (response.ok) {
      setUsername("");
      setEmail("");
      setPassword("");
      setError(null);
      console.log("Add succed", json);
      toast.success("Welcome to the club");
      dispatch({ type: "CREATE_DATA", payload: json });
    } else {
      toast.error("Gagal Memasukan Data 😔", {
        toastId: "toast-title-error",
      });
      toast.error("Gagal Memasukan Data 😔", {
        toastId: "toast-title-error",
      });
    }
  };

  return (
    <div className="main h-full">
      <h1 className="text-4xl font-bold mt-5">Start your learning journey.</h1>
      <form className="flex flex-col mt-5 gap-4" onSubmit={handleOnSubmit}>
        <Typography variant="h6" color="blue-gray" className="-mb-3">
          Your Name
        </Typography>
        <Input
          size="lg"
          placeholder="your name"
          name="username"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />

        <Typography variant="h6" color="blue-gray" className="-mb-3">
          Your Email
        </Typography>
        <Input
          size="lg"
          placeholder="name@gmail.com"
          type="email"
          name="email"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <Typography variant="h6" color="blue-gray" className="-mb-3">
          Password
        </Typography>
        <Input
          type="password"
          size="lg"
          placeholder="********"
          name="password"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <Button className="mt-6" fullWidth type="submit">
          Sign up
        </Button>
        {error && <div className="error"> {error} </div>}
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-gray-900">
            Sign in
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
    </div>
  );
};

export default FormInput;
