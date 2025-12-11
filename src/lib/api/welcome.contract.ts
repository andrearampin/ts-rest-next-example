import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();

export const welcomeContract = c.router({
  create: {
    method: 'POST',
    path: '/api/welcome',
    body: z.object({
      name: z.string(),
    }),
    responses: {
      200: z.object({
        message: z.string(),
      }),
    },
  },
});
