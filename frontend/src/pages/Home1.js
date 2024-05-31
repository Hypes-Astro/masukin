import { Link } from "react-router-dom";
import Modal from "../components/Modal";

const Home1 = () => {
  return (
    <div className="Homepage h-[90vh] flex justify-center items-center">
      <div className="boxMain rounded-xl shadow-2xl w-1/2 h-[80%] p-10 flex flex-col justify-center item-center text-center gap-8">
        <h1 className="text-8xl font-semibold">
          Reach the future of innovation.
        </h1>
        <p className="text-xl">
          Join us as a student or educator and shape the future together.
        </p>

        <div className="path w-full flex justify-center gap-14">
          {/* Teacher */}
          <Link to="/login">
            <button className="bg-blue-100 px-24 py-3 rounded-full">
              Teacher
            </button>
          </Link>

          {/* Student */}
          <Link to="/signup">
            <button className="bg-blue-100 px-24 py-3 rounded-full">
              Student
            </button>
          </Link>
        </div>
        {/* Modal */}
        <Modal />

        <Link to="/login" className="text-blue-500">
          I already create an account
        </Link>
      </div>
    </div>
  );
};

export default Home1;
