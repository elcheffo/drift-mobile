import { useMutation } from "@tanstack/react-query";
import {
  createAssociatedTokenAccount, getAssociatedTokenAddressSync, createAssociatedTokenAccountInstruction, TOKEN_PROGRAM_ID
  , ASSOCIATED_TOKEN_PROGRAM_ID
} from "@solana/spl-token"
import { BN, WRAPPED_SOL_MINT } from "@drift-labs/sdk";
import { useDriftClient } from "@/contexts/DriftClientProvider";
import { Transaction } from '@solana/web3.js'

export function useInitializeWsolAccount() {

  const { driftClient: client } = useDriftClient();
  return useMutation({
    mutationFn: async () => {

      const associatedToken = getAssociatedTokenAddressSync(
        WRAPPED_SOL_MINT,
        client.wallet.publicKey,
        false
      );

      const transaction = new Transaction().add(
        createAssociatedTokenAccountInstruction(
          client.wallet.publicKey,
          associatedToken,
          client.wallet.publicKey,
          WRAPPED_SOL_MINT,
        )
      );
      
      transaction.recentBlockhash = (await client.connection.getLatestBlockhash()).blockhash;
      transaction.feePayer = client.wallet.publicKey;

      const signedTx = await client.wallet.signTransaction(transaction);
      const signature = await client.sendSignedTx(signedTx);
      const result = await client.connection.confirmTransaction(signature, "processed");
      if (result.value.err) throw new Error(result.value.err.toString());

      return signature;

    }
  })
}