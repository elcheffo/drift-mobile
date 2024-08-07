import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import bs58 from "bs58";
import { DriftClient, Wallet } from "@drift-labs/sdk";
import { Keypair } from "@solana/web3.js";
import { PRIVATE_KEY } from "@/constants/wallet";
import { connection } from "@/lib/blockchain/connection";
import { DRIFT_NETWORK } from "@/constants/network";

type DriftClientContextProps = {
  driftClient: DriftClient;
};

export const DriftClientContext = createContext<DriftClientContextProps | null>(
  null
);

export function useDriftClient() {
  const context = useContext(DriftClientContext);
  if (!context) {
    throw new Error("useDriftClient must be used within a DriftClientProvider");
  }
  return context;
}

type DriftClientProviderProps = PropsWithChildren<object>;

export function DriftClientProvider(props: DriftClientProviderProps) {
  const client = useMemo<DriftClient>(() => {
    const privateKey = PRIVATE_KEY.replace(/\s/g, "");
    const secretKey = new Uint8Array(bs58.decode(privateKey));
    const keypair = Keypair.fromSecretKey(secretKey);
    const wallet = new Wallet(keypair);
    const client = new DriftClient({
      connection,
      wallet,
      env: DRIFT_NETWORK,
    });
    return client;
  }, []);
  return (
    <DriftClientContext.Provider
      value={{
        driftClient: client,
      }}
    >
      {props.children}
    </DriftClientContext.Provider>
  );
}
