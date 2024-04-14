import React, { useState, useContext, useEffect } from "react";

// INTERNLA IMPORT
import {
  Header,
  Home,
  Action,
  GetPool,
  Networks,
  LiqudityHistory,
  PoolHistory,
  Promo,
  Loader,
  IconOne,
  IconTwo,
} from "../components/index";
import { CONTEXT } from "../context/index";

const index = () => {
  const { DAPP_NAME, GET_POOL_ADDRESS, load, GET_POOL_DETAILS } =
    useContext(CONTEXT);

  // STATE VARIABLE
  const [activeNetwork, setActiveNetwork] = useState("");
  const [activeComponent, setActiveComponent] = useState("Home");

  useEffect(() => {
    const network = JSON.parse(localStorage.getItem("activeNetwork"));
    setActiveNetwork(network?.name);
  }, [activeNetwork]);

  return (
    <div className="bg-slate-900">
      <Header
        setActiveComponent={setActiveComponent}
        activeNetwork={activeNetwork}
      />
      {activeComponent == "Home" ? (
        <>
          <Home
            setActiveComponent={setActiveComponent}
            GET_POOL_DETAILS={GET_POOL_DETAILS}
          />
        </>
      ) : activeComponent == "Liqudity" ? (
        <GetPool GET_POOL_ADDRESS={GET_POOL_ADDRESS} />
      ) : activeComponent == "Pool History" ? (
        <PoolHistory setActiveComponent={setActiveComponent} />
      ) : activeComponent == "Liqudity History" ? (
        <LiqudityHistory setActiveComponent={setActiveComponent} />
      ) : activeComponent == "Networks" ? (
        <Networks
          setActiveComponent={setActiveComponent}
          setActiveNetwork={setActiveNetwork}
          activeNetwork={activeNetwork}
        />
      ) : (
        ""
      )}

      <Action />
      {load && (
        <div className="new_loader">
          <load />
        </div>
      )}
    </div>
  );
};

export default index;
