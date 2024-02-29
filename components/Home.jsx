import { useState, useEffect } from "react";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import toast, { Toaster } from "react-hot-toast";

// INTERNAL IMPORT
import { IconOne, IconTwo } from "./index";

const Home = ({ setActiveComponent, GET_POOL_DETAILS }) => {
  // STATE VARIABLES
  const [selectedNetwork, setSetselectedNetwork] = useState("");
  const [poolAddress, setPoolAddress] = useState("");
  const [poolDetails, setPoolDetails] = useState();

  // NOTIFICATION
  const notifyError = (msg) => {
    toast.error(msg, { duration: 400 });
  };

  useEffect(() => {
    const network = JSON.parse(localStorage.getItem("activeNetwork"));
    setSetselectedNetwork(network);
  }, []);

  // CALLING FUNCTION
  const CALL_POOL_ADDRESS = async (inputAddress) => {
    const { rpcUrl } = selectedNetwork;

    const zeroAddress = "0";

    if (!inputAddress || !rpcUrl || inputAddress == zeroAddress) {
      return notifyError("Provide Data or Invaild Address!!");
    }

    const poolDetails = await GET_POOL_DETAILS(inputAddress, selectedNetwork);
    setPoolDetails(poolDetails);
  };

  return (
    <section className="relative overflow-hidden pt-[72px] bg-default-950/40 backdrop-blur-3xl">
      <div className="absolute h-14 w-14 bg-primary/10 top-2/3 start-80 -z-1 rounded-2xl rounded-tl-none rounded-br-none animate-[spin_10s_linear_infinite]"></div>

      <div className="absolute h-14 w-14 bg-primary/10 -z-1 rounded-full animate-ping"></div>

      <div className="px-6 pt-20 overflow-hidden">
        <div className="relative">
          <div className="absolute left-1/2 top-4 h-[1026px] w-[1026px] -translate-x-1/3 stroke-default-300/70 [mask-image:liner-gradient(to_bottom, white_20%, transparent_75%)] sm: top-16 -translate-x-1/2 lg:-top-16 lg:ml-12 xl:-top-14 xl:ml-0">
            <IconOne />
            <IconTwo />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
