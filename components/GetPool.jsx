import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const GetPool = ({ GET_POOL_ADDRESS }) => {
  const [selectedNetwork, setSelectedNetwork] = useState({});
  const [poolAddress, setPoolAddress] = useState([]);

  //NOTIFICATION
  const notifyError = (msg) => {
    toast.error(msg, { duration: 4000 });
  };

  useEffect(() => {
    const network = JSON.parse(localStorage.getItem("activeNetwork"));
    setSelectedNetwork(network);
  }, []);

  const [liqudity, setLiqudity] = useState({
    token_A: "",
    token_B: "",
    fee: "",
  });

  const handleFormFieldChange = (fileName, e) => {
    setLiqudity({ ...liqudity, [fileName]: e.target.value });
  };

  const CALL_POOL_ADDRESS = async () => {
    const { token_A, token_B, fee } = liqudity;

    const { rpcUrl } = selectedNetwork;

    if (!token_A || !token_B || !fee || !rpcUrl) {
      return notifyError("Provide all the details");
    }

    const poolAddress = await GET_POOL_ADDRESS(liqudity, selectedNetwork);
    setPoolAddress(poolAddress);
  };

  return (
    <section className="flex items-center py-6 px-0 lg:p-10 w-full lg:h-screen">
      <div className="container backdrop-blur-2xl bg-default-950/40 rounded-2xl overflow-hidden max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left side componets */}
          <div className="hidden lg:block ps-4 py-4">
            <div className="relative rounded-xl overflow-hidden h-full w-full">
              <img
                src="assets/images/ai/auth-img.jpg"
                alt=""
                className="w-ful h-full transform -scale-x-100 mt-16"
              />
              <div className="absolute inset-0 bg-default-950/40">
                <div className="flex justify-center h-full items-end">
                  <div className="p-6 text-start">
                    <h5>
                      Is the best way, <br /> to find any network liqudity pool
                      address
                    </h5>
                    <p className="text-base font-medium text-default-500 text-white">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Praesentium, enim?
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Right side componets */}
          <div className="flex flex-col h-full p-10 lg:ps-0 mt-14">
            <div className="pb-6 my-auto">
              <h4 className="text-2xl font-bold text-white mb-4">
                Check Liqudity Pool Address
              </h4>
              <p className="text-default-300 mb-8 max-w-sm">
                Enter details of the 2 token and pool fee
              </p>
              <div className="text-start">
                <div className="mb-4">
                  <label className="block text-base/normal font-semibold text-default-200 mb-2">
                    Token A
                  </label>
                  <input
                    type="text"
                    onChange={(e) => handleFormFieldChange("token_A", e)}
                    className="block w-full rounded py-1.5 px-3 bg-transparent border-white/10 border-default-200 text-white focus:border-white/25 focus:ring-transparent"
                    placeholder="Enter Your Token A"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-base/normal font-semibold text-default-200 mb-2">
                    Token B
                  </label>
                  <input
                    type="text"
                    onChange={(e) => handleFormFieldChange("token_B", e)}
                    className="block w-full rounded py-1.5 px-3 bg-transparent border-white/10 border-default-200 text-white focus:border-white/25 focus:ring-transparent"
                    placeholder="Enter Your Token B"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-base/normal font-semibold text-default-200 mb-2">
                    Fee
                  </label>
                  <input
                    type="text"
                    onChange={(e) => handleFormFieldChange("fee", e)}
                    className="block w-full rounded py-1.5 px-3 bg-transparent border-white/10 border-default-200 text-white focus:border-white/25 focus:ring-transparent"
                    placeholder="Enter Pool Fee"
                  />
                </div>

                <div className="mb-6 text-center">
                  <button
                    onClick={() => CALL_POOL_ADDRESS()}
                    className="w-full inline-flex items-center justify-center px-6 py-6 backdrop-blur-2xl bg-primary-600/90 text-white rounded-lg transition-all duration-500 group hover:bg-primary-600 mt-5"
                  >
                    <span className="fw-bold">Get Pool Address</span>
                  </button>
                </div>

                {poolAddress && (
                  <>
                    {poolAddress.map((pool, address) => (
                      <div className="mb-4">
                        <input
                          key={address + 2}
                          type="text"
                          onClick={(e) => navigator.clipboard.writeText(pool)}
                          value={`${address + 1}: ${pool}`}
                          className="block w-full rounded py-1.5 px-3 bg-transparent border-white/10 border-default-200 text-white focus:border-white/25 focus:ring-transparent"
                        />
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetPool;
