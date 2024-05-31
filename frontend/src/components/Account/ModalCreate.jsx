import React, { useContext, useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";
// toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMemberContext } from "../../hooks/useMemberContext";
import { MemberContext } from "../../context/memberContext";
const ModalCreate = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const { dispatch, loggedInUser, token } = useContext(MemberContext);
  const [sessionData, setSessionData] = useState({
    session_name: "",
    session_quota: "",
    session_date: "",
    session_begin: "",
    session_end: "",
    session_link: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSessionData({ ...sessionData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const session_creator = loggedInUser._id; // Ambil ID dari user yang sedang login
    console.log(session_creator);
    console.log("ini token", token);
    const response = await fetch("/api/masukin/createsessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, // Pastikan untuk mengirimkan token jika diperlukan
        "Content-Type": "application/json", // Tambahkan header Content-Type
      },
      body: JSON.stringify({ ...sessionData, session_creator }),
    });

    console.log(response);
    const data = await response.json();
    console.log("data", data);

    if (response.ok) {
      console.log("berhasil", response);
      toast.success("Welcome to the club");
      dispatch({ type: "CREATE_SESSION", payload: data });
    } else {
      toast.error("Gagal Memasukan Data 😔", {
        toastId: "toast-title-error",
      });
      console.error(data.error);
    }
  };

  return (
    <>
      <Button onClick={handleOpen} className=" mt-5 flex items-center gap-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          color="#ffffff"
          fill="none"
        >
          <path
            d="M12 8V16M16 12L8 12"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
            stroke="currentColor"
            stroke-width="1.5"
          />
        </svg>
        Tambah Ruang
      </Button>
      <Dialog
        size="lg"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-[50vw] ">
          <CardBody className="flex flex-col gap-4">
            {/* <form onSubmit={handleSubmit}></form> */}
            <Typography variant="h4" color="blue-gray">
              Buat Ruang-Mu
            </Typography>
            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              Berikan Judul dan Link Ruang Mu
            </Typography>
            <form
              onSubmit={handleSubmit}
              className="content flex justify-between w-full gap-4  "
            >
              <div className="informasi flex flex-col gap-4 w-1/2">
                <Typography className="" variant="h6">
                  Judul
                </Typography>
                <Input
                  label="Judul"
                  size="lg"
                  name="session_name"
                  value={sessionData.session_name}
                  onChange={handleChange}
                />
                <Typography className="" variant="h6">
                  Link
                </Typography>
                <Input
                  label="link"
                  size="lg"
                  name="session_link"
                  value={sessionData.session_link}
                  onChange={handleChange}
                />
                <Typography className="" variant="h6">
                  Kuota
                </Typography>
                <Input
                  label="kuota"
                  type="number"
                  size="lg"
                  name="session_quota"
                  value={sessionData.session_quota}
                  onChange={handleChange}
                />
              </div>
              <div className="time gap-4 flex flex-col w-1/2">
                <Typography className="" variant="h6">
                  Waktu
                </Typography>
                <Input
                  label="Hari"
                  type="date"
                  size="lg"
                  name="session_date"
                  value={sessionData.session_date}
                  onChange={handleChange}
                />
                <Input
                  label="mulai"
                  type="time"
                  size="lg"
                  name="session_begin"
                  value={sessionData.session_begin}
                  onChange={handleChange}
                />
                <Input
                  label="selesai"
                  type="time"
                  size="lg"
                  name="session_end"
                  value={sessionData.session_end}
                  onChange={handleChange}
                />
              </div>
              <Button variant="gradient" type="submit" className="w-1/2">
                Buat Ruang
              </Button>
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
          </CardBody>
          {/* <CardFooter className="pt-0 flex items-center justify-center">
            <Button variant="gradient" type="submit" className="w-1/2">
              Buat Ruang
            </Button>
          </CardFooter> */}
        </Card>
      </Dialog>
    </>
  );
};
export default ModalCreate;
