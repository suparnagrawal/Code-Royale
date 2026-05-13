import AttackPanel from "@/components/battlefield/AttackPanel";
import BattlefieldNavBar from "@/components/battlefield/BattlefieldNavbar";
import Mission from "@/components/battlefield/Mission";
import React from "react";

const Battlefield = () => {
  const bfProps = { num: 1, name: "Two Sum" };
  return (
    <main className="h-screen flex flex-col">
      <BattlefieldNavBar
        missionNumber={bfProps.num}
        missionName={bfProps.name}
      />
      <section className="p-2 flex flex-1 flex-col gap-2">
        <Mission description={"missionDesc"} examples={"examples"}></Mission>
        <AttackPanel></AttackPanel>
      </section>
    </main>
  );
};

export default Battlefield;
