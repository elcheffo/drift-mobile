import { RPC_URL } from "@/constants/network";
import { clusterApiUrl, Connection } from "@solana/web3.js";

export const connection = new Connection(RPC_URL, "confirmed");
