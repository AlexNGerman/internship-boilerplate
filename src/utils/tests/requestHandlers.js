import { graphql } from 'msw';
import * as responses from 'utils/tests/responces';

export const signUpError = graphql.mutation('createUser', (_, res, ctx) => {
  return res(
    ctx.data(responses.signUpError),
  )
});

export const requestHandlers = [
  graphql.mutation('createUser', (_, res, ctx) => {
    return res(
      ctx.data(responses.createUser),
    )
  })
];
