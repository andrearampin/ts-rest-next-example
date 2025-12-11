import { initQueryClient } from "@ts-rest/react-query";
import { apiContract } from "./contracts";

export const apiClient = initQueryClient(apiContract, {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  baseHeaders: {
    "Content-Type": "application/json",
  },
});
