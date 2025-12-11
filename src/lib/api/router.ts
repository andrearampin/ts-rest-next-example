import { tsr } from "@ts-rest/serverless/next";
import { apiContract } from "./contract";

import { welcomeRouter } from "./welcome.route";

export const apiRouter = tsr.router(apiContract, {
  welcome: welcomeRouter,
});