import React, { useState, useEffect } from "react";
import { ethers, Contract } from "ethers";
import axios from "axios";
import UniswapV3Pool from "@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json";
import toast from "react-hot-toast";

// INTERNAL IMPORT
import { FACTORY_ABI, FACTORY_ADDRESS } from "./constants";
import { parseErrorMsg, shortenAddress } from "../utils/shortaddress";

export const CONTEXT = React.createContext();
export const CONTEXT_PROVIDER = ({ children }) => {
  const DAPP_NAME = "WebAI";
  const [load, setLoad] = useState(false);

  // NOTIFICATION
  const notifyError = (msg) => toast.error(msg, { duration: 4000 });
  const notifySuccess = (msg) => toast.success(msg, { duration: 4000 });

  // GET POOL ADDRESS
  const GET_POOL_ADDRESS = async (liqudity, selectedNetwork) => {
    try {
      setLoad(true);
      // PROVIDER
      const PROVIDER = new ethers.providers.JsonRpcBatchProvider(
        selectedNetwork.rpcUrl
      );
      //   const PROVIDER = new ethers.providers.JsonRpcBatchProvider(
      //     "https://rpc.ankr.com/polygon_mumbai"
      //   );
      const factoryContract = new ethers.Contract(
        FACTORY_ADDRESS,
        FACTORY_ABI,
        PROVIDER
      );

      const poolAddress = await factoryContract.functions.getPool(
        liqudity.token_A,
        liqudity.token_B,
        Number(liqudity.fee)
      );
      const PoolHistory = {
        token_A: liqudity.token_A,
        token_B: liqudity.token_b,
        fee: liqudity.fee,
        network: selectedNetwork.name,
        poolAddress: poolAddress,
      };

      let poolArray = [];
      const poolLists = localStorage.getItem("poolHistory");
      if (poolLists) {
        poolArray = JSON.parse(localStorage.getItem("poolHistory"));
        poolArray.push(PoolHistory);
        localStorage.setItem("poolHistory", JSON.stringify(poolArray));
      } else {
        poolArray.push(PoolHistory);
        localStorage.setItem("poolHistory", JSON.stringify(poolArray));
      }
      setLoad(false);
      notifySuccess("Successfully Completed");
      return poolAddress;
    } catch (error) {
      const errorMsg = parseErrorMsg(error);
      setLoad(false);
      notifyError(errorMsg);
      console.log(errorMsg);
    }
  };

  // GET POOL DETAILS(INTERNAL FUNCTION)
  async function getPoolData(poolContract, selectedNetwork, poolAddress) {
    const [liqudity, fee, token0, token1] = await Promise.all([
      poolContract.liqudity(),
      poolContract.fee(),
      poolContract.token0(),
      poolContract.token1(),
    ]);

    return {
      liqudity: liqudity.toString(),
      fee: fee,
      token_A: token0,
      token_B: token1,
      network: selectedNetwork.name,
      poolAddress: poolAddress,
    };
  }

  const GET_POOL_DETAILS = async (poolAddress, selectedNetwork) => {
    try {
      setLoad(true);
      const PROVIDER = new ethers.providers.JsonRpcBatchProvider(
        selectedNetwork.rpcUrl
      );
      const poolContract = new Contract(
        poolAddress,
        UniswapV3Pool.abi,
        PROVIDER
      );

      const poolData = await getPoolData(
        poolContract,
        selectedNetwork,
        poolAddress
      );

      let liqudityArray = [];
      const poolLists = localStorage.getItem("liqudityHistory");
      if (poolLists) {
        liqudityArray = JSON.parse(localStorage.getItem("liqudityHistory"));
        liqudityArray.push(poolData);
        localStorage.setItem("liqudityHistory", JSON.stringify(liqudityArray));
      } else {
        liqudityArray.push(poolData);
        localStorage.setItem("liqudityHistory", JSON.stringify(liqudityArray));
      }
      setLoad(false);
      notifySuccess("Successfully Completed");

      return poolData;
    } catch (error) {
      const errorMsg = parseErrorMsg(error);
      setLoad(false);
      notifyError(errorMsg);
      console.log(errorMsg);
    }
  };

  return (
    <CONTEXT.Provider
      value={{ DAPP_NAME, GET_POOL_ADDRESS, load, GET_POOL_DETAILS }}
    >
      {children}
    </CONTEXT.Provider>
  );
};
