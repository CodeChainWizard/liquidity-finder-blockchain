import React from "react";

const Networks = ({ setActiveComponent, setActiveNetwork, activeNetwork }) => {
  // NETWORK LIST
  const networks = [
    {
      name: "Ethereum",
      rpcUrl: "https://rpc.ankr.com/eth",
      logo: "assets/images/ethereum.png",
    },
    {
      name: "Polygon Mumbai",
      rpcUrl: "https://rpc.ankr.com/polygon_mumbai",
      logo: "assets/images/polygon.png",
    },
    {
      name: "Polygon",
      rpcUrl: "https://rpc.ankr.com/polygon",
      logo: "assets/images/ethereum.png",
    },
    {
      name: "Holesky",
      rpcUrl: "https://rpc.ankr.com/eth_holesky",
      logo: "assets/images/ethereum.png",
    },
    {
      name: "Sepolia",
      rpcUrl: "https://rpc.ankr.com/eth_sepolia",
      logo: "assets/images/ethereum.png",
    },
  ];

  const selectNetwork = (network) => {
    setActiveNetwork(network.name);
    setActiveComponent(network.name);
    localStorage.setItem("activeNetwork", JSON.stringify(network));
  };

  return (
    <section id="generator" className="py-14">
      <div className="container z-10">
        <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 py-20">
          {networks?.map((networks, index) => (
            <div
              className=""
              key={index + 1}
              onClick={() => selectNetwork(networks)}
            >
              <div
                className={`group p-8 rounded-xl bg-default-950/40 transition-all duration-500 hover:-translate-y-2 hover:bg-primary/40 ${
                  activeNetwork == networks.name ? "bg-primary/40" : ""
                }`}
              >
                <div className="h-14 w-14 flex items-center justify-center rounded-lg bg-primary text-primary group-hover:bg-white/20 group-hover:text-white">
                  <img src={networks.logo} className="h-10" alt="" />
                </div>
                <h3 className="text-xl font-medium text-default-200 mt-8">
                  {networks.name}
                </h3>
                <p className="text-base fonr-normal text-default-300 mt-4">
                  By utilizing the selected network{" "}
                  <strong>{networks.name}</strong>, You can able to find and get
                  access of the details for getting the pool address and
                  liqudity.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Networks;
