import { Button } from "@material-tailwind/react";

import Login from "../Login/login";
import { Link } from "react-router-dom";
const LandingPage = () => {
  return (
    <>
      <div className="heading mt-16 flex w-full justify-center items-center text-center">
        <div className="top-content w-1/2 p-3">
          <h1 className="font-semibold text-[4rem] ">
            Masuk dan Jelajahi Kegiatan
          </h1>
          <p className="font-normal w-[80%] mx-auto mt-4">
            Kami menyediakan platform yang memudahkan Anda untuk membuat dan
            bergabung dengan ruang temu online. Ideal untuk komunitas, kelas,
            pertemuan bisnis, dan banyak lagi.
          </p>

          <Link to={"/login"}>
            <Button
              className="flex items-center gap-2 mt-10 mx-auto"
              ripple={true}
            >
              Ayok Mulai!
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
