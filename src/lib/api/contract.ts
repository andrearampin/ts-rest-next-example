import { initContract } from '@ts-rest/core';
import { welcomeContract } from './welcome.contract';

const c = initContract();

export const apiContract = c.router({
  welcome: welcomeContract,
});

export type ApiContract = typeof apiContract;
