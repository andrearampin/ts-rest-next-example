import { tsr } from '@ts-rest/serverless/next';
import { apiContract } from '@/lib/api/contract';

export const createHandler = async ({ body }: { body: { name: string } }) => {
  return {
    status: 200 as const,
    body: {
      message: `Welcome ${body.name}`,
    },
  };
};

export const welcomeRouter = tsr.router(apiContract.welcome, {
  create: createHandler,
});
