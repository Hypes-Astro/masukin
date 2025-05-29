import AccountProfil from "../../components/Account/AccountProfil";
import HistoryCreate from "../../components/Account/HistoryCreate";

const AccountPage = () => {
  return (
    <div className="main-box  w-full h-full flex items-center flex-col">
      <AccountProfil />
      <HistoryCreate />
    </div>
  );
};

export default AccountPage;
