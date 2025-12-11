import { createNextHandler } from "@ts-rest/serverless/next";
import { apiContract } from "@/lib/contracts";

export const welcomeHandler = async ({ body }: { body: { name: string } }) => {
  return {
    status: 200,
    body: {
      message: `${body.name} welcome`,
    },
  };
};

const handler = createNextHandler(apiContract, {
  welcome: welcomeHandler,
}, {
  handlerType: "app-router",
});

export { handler as POST };
