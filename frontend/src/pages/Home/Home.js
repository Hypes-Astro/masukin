import { useContext } from "react";
import { MemberContext } from "../../context/memberContext";

const Home = () => {
  const { loggedInUser } = useContext(MemberContext);

  return (
    <>
      <p>Selamat datang, {loggedInUser?.username || "User"}</p>
      <p>Email: {loggedInUser?.email}</p>
      <p>Power: {loggedInUser?.power}</p>
      <p>Ini masuk kedalam Home</p>
    </>
  );
};

export default Home;
