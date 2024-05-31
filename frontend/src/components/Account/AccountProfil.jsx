import React, { useContext, useEffect, useState } from "react";
import { MemberContext } from "../../context/memberContext";
import { Button } from "@material-tailwind/react";
import ModalCreate from "./ModalCreate";
export default function AccountProfil() {
  const { loggedInUser } = useContext(MemberContext);
  const [power, setPower] = useState();

  const powerUser = loggedInUser.power;
  useEffect(() => {
    console.log(powerUser);
    if (powerUser >= 0 && powerUser <= 20) {
      setPower("Petualang");
      return;
    }
    if (powerUser >= 21 && powerUser <= 50) {
      setPower("Pejuang");
    }
    if (powerUser >= 51 && powerUser <= 100) {
      setPower("Penguasa");
    }
  }, [powerUser]);

  const levelPower = () => {
    if (powerUser >= 0 && powerUser <= 20) {
      return (
        <p className=" bg-blue-gray-400 full text-center text-white p-1 rounded-lg  font-medium text-base">
          {" "}
          {power}{" "}
        </p>
      );
    } else if (powerUser >= 21 && powerUser <= 50) {
      return (
        <p className="bg-blue-400 w-full text-center text-white p-1 rounded-lg  font-medium text-base">
          {" "}
          {power}{" "}
        </p>
      );
    } else {
      return (
        <p className="bg-green-400 w-full text-center text-white p-1 rounded-lg  font-medium text-base">
          {" "}
          {power}{" "}
        </p>
      );
    }
  };
  return (
    <div className="box1 mt-5 shadow-xl rounded-lg w-[45%] h-[30vh] flex justify-around gap-4 p-4 ">
      {/* image */}
      <div className="img w-1/2 ">
        <img
          className="rounded-lg"
          src="https://i.pinimg.com/736x/88/2a/1d/882a1dd324fb7a2b36c02dcbda16485f.jpg"
          alt=""
          srcset=""
        />
      </div>
      {/* detail */}
      <div className="info w-full p-4">
        {/* informasi identitas */}
        <div className="atas flex w-full justify-between">
          <div className="kiri">
            <h1 className="font-semibold text-2xl">
              {" "}
              {loggedInUser?.username || "Username"}{" "}
            </h1>
            <h2 className="font-normal text-base">
              {loggedInUser?.email || "Email"}
            </h2>
          </div>
          <div className="kanan">{levelPower()}</div>
        </div>

        <ModalCreate />
      </div>
    </div>
  );
}
