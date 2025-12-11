import { createNextHandler } from "@ts-rest/serverless/next";
import { apiContract } from "@/lib/contracts";

const handler = createNextHandler(apiContract, {
  welcome: async ({ body }) => {
    return {
      status: 200,
      body: {
        message: `${body.name} welcome`,
      },
    };
  },
}, {
  handlerType: "app-router",
});

export { handler as POST };
