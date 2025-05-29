import OwnSessionCard from "../OwnSessionCard";

const HistoryCreate = () => {
  return (
    <div className="box2 mt-5 rounded-lg w-[85%] h-[30vh] bg-red-200 p-4 ">
      <h1 className="font-semibold">Ruang Mu</h1>
      <ul className="grid grid-cols-3 gap-4 ">
        {/* map */}
        <li className="li" key="">
          <OwnSessionCard />
        </li>
      </ul>
    </div>
  );
};

export default HistoryCreate;
