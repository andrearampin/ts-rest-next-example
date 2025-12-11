import { apiContract } from '@/lib/api/contracts';
import { apiRouter } from '@/lib/api/routers';
import { createNextHandler } from '@ts-rest/serverless/next';

const handler = createNextHandler(
    apiContract,
    apiRouter,
    {
      jsonQuery: true,
      responseValidation: true,
      handlerType: 'app-router',
    },
  );
  
  export {
    handler as GET,
    handler as POST,
    handler as PUT,
    handler as PATCH,
    handler as DELETE,
    handler as OPTIONS,
  };