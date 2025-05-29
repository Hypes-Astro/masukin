import { MemberContext } from "../context/memberContext";
import { useContext } from "react";

export const useMemberContext = () => {
  const context = useContext(MemberContext);

  if (!context) {
    throw Error("useMemberContext must be used inside an ContextProvide");
  }

  return context;
};
