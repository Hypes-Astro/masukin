import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="nav w-screen h-12 py-10 flex items-center px-20 justify-between">
      <Link to="/">
        <h1 className="font-bold text-5xl">Masukin</h1>
      </Link>

      {/* login */}
      <Link to="/signup">
        <button className="bg-lime-100 px-10 py-3 rounded-full">Masuk</button>
      </Link>
    </div>
  );
};

export default Navbar;
