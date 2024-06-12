import { Link } from "react-router-dom";
import { Sessions } from "./data";

const Home = () => {
  return (
    <div className="w-full h-full flex flex-col mt-5">
      <p className="font-bold text-xl mx-20">List Ruang</p>
      <div className="flex items-center justify-center mx-auto ">
        <div className="list-sesi w-[90%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5  justify-center items-center ">
          {Sessions.map((session, index) => (
            <div className="hover:bg-gray-200 box-card shadow-xl w-[16rem] h-[17.5rem] rounded-lg flex flex-col">
              <div className="profil-card p-3 ">
                <div className="info bg-gray-900 rounded-lg h-[7rem] p-2">
                  <div className="status w-full  flex justify-between  ">
                    <div className="kuota rounded-2xl text-white flex items-center justify-center bg-gray-800 px-2 py-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20px"
                        viewBox="0 -960 960 960"
                        width="20px"
                        fill="#EFEFEF"
                      >
                        <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" />
                      </svg>
                      <p className="text-xs">{session.session_quota}</p>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#75FB4C"
                    >
                      <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
                    </svg>
                  </div>
                  <div className="name-session text-white mt-4 font-bold text-lg ">
                    <p className="judul-sesi line-clamp-2">
                      {session.session_name}
                    </p>
                  </div>
                </div>
              </div>
              <div className="info-detail px-3">
                <p className="tanggal-mulai font-semibold text-base">
                  {session.session_date}
                </p>
                <p className="jam text-sm">
                  {session.session_begin} - {session.session_end} wib
                </p>
                <div className="created-by text-xs inline-block">
                  <p className="bg-green-200 rounded-full px-2 py-1">
                    {session.session_creator}
                  </p>
                </div>
              </div>

              <div className="w-full flex items-center justify-center mt-5">
                <Link
                  key={index}
                  to={session.session_link}
                  className="bg-black hover:bg-blue-gray-900 text-white p-2 rounded-md"
                >
                  Masuk Ruang
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
