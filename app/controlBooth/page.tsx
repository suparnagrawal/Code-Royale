import LogoutButton from "@/components/auth/LogoutButton";
import EnterBattlefield from "@/components/controlBooth/EnterBattlefield";
import React from "react";

const page = () => {
  return (
    <>
      <EnterBattlefield></EnterBattlefield>
      <LogoutButton></LogoutButton>
    </>
  );
};

export default page;
