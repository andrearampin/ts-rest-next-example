import { createNextHandler } from "@ts-rest/serverless/next";
import { apiContract } from "@/lib/api/contracts";
import { STATUS_CODES } from "@/lib/constants";

export const welcomeHandler = async ({ body }: { body: { name: string } }) => {
  return {
    status: STATUS_CODES.OK,
    body: {
      message: `Welcome ${body.name}`,
    },
  };
};

const handler = createNextHandler(apiContract, {
  welcome: welcomeHandler,
}, {
  handlerType: "app-router",
});

export { handler as POST };
