import BattlefieldClient from "@/components/battlefield/BattlefieldClient";
import { LANGUAGE_IDS } from "@/lib/judge0";

const Battlefield = async () => {
  return (
    <BattlefieldClient
      languageId={LANGUAGE_IDS.cpp}
    />
  );
};

export default Battlefield;
