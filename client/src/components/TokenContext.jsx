
import { createContext, useContext, useState } from "react";

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [tokenFromMarketPlace, setTokenFromMarketPlace] = useState("");

  return (
    <TokenContext.Provider value={{ tokenFromMarketPlace, setTokenFromMarketPlace }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useTokenContext = () => {
  return useContext(TokenContext);
};
