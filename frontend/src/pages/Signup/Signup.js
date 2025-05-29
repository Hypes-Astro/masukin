import FormInput from "../../components/FormInput";

const Signup = () => {
  return (
    <div className=" mt-6 SignupPage h-full flex justify-center">
      <div className="boxMain rounded-xl shadow-2xl w-[65%] h-[80%] p-10 flex flex-col sm:flex-row md:flex-col lg:flex-row justify-center items-center gap-11">
        <div className="imgContent w-full h-full relative ">
          <img
            src="/asset/loginpage.jpg"
            className="object-cover w-full h-full rounded-lg"
            alt="loginpage"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black rounded-lg h-[65%] top-auto"></div>

          <div className="absolute left-[5%] top-[65%] text-white ">
            <h1 className="text-4xl font-bold">Bagikan Ruang Belajar</h1>
            <p className="text-lg">Gabung / Buat Ruang Mu</p>
          </div>
        </div>
        <div className="formContent w-full h-full">
          <FormInput />
        </div>
      </div>
    </div>
  );
};

export default Signup;
