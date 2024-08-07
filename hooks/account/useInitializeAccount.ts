import "@/lib/blockchain/polyfills"
import { useDriftClient } from "@/contexts/DriftClientProvider";
import { BN, WRAPPED_SOL_MINT } from "@drift-labs/sdk";
import { getAssociatedTokenAddressSync } from "@solana/spl-token";
import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";

export function useInitializeAccount() {
  const { driftClient: client } = useDriftClient();
  return useMutation({
    mutationFn: async () => {
      const wSolAta = getAssociatedTokenAddressSync(
        WRAPPED_SOL_MINT,
        client.wallet.publicKey
      );
      // const result = await client.initializeUserAccount();
      const result = await client.initializeUserAccountAndDepositCollateral(
        new BN(1),
        wSolAta
      );
      return result;
    },
    onError: (err) => Alert.alert("Error initializing account", err.message),
  });
}
