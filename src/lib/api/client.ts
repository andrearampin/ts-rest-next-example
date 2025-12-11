import { initTsrReactQuery } from "@ts-rest/react-query/v5";
import { apiContract } from "@/lib/api/contracts";

export const apiClient = initTsrReactQuery(apiContract, {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  baseHeaders: {
    "Content-Type": "application/json",
  },
});
