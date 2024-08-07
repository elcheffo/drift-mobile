import "@/lib/blockchain/polyfills";
import { connection } from "@/lib/blockchain/connection";
import {
  VersionedTransaction,
  SystemProgram,
  TransactionMessage,
  Keypair,
  Transaction,
} from "@solana/web3.js";
import { useMutation } from "@tanstack/react-query";
import { useDriftClient } from "@/contexts/DriftClientProvider";
import { DEAD_ADDRESS } from "@/constants/wallet";
import { Alert } from "react-native";

export function useTransferExampleTx() {
  const { driftClient: client } = useDriftClient();

  return useMutation({
    mutationFn: async () => {
      const instructions = [
        SystemProgram.transfer({
          fromPubkey: client.wallet.publicKey,
          toPubkey: DEAD_ADDRESS,
          lamports: 1,
        }),
      ];

      const transaction = new Transaction().add(...instructions);
      transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
      transaction.feePayer = client.wallet.publicKey;
      const signedTx = await client.wallet.signTransaction(transaction);
      const signature = await client.sendSignedTx(signedTx);

      const result = await client.connection.confirmTransaction(signature, "processed");

      if (result.value.err) throw new Error(result.value.err.toString());

      return signature;
    },
  });
}
