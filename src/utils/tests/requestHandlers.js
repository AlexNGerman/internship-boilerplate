import { graphql } from 'msw';
import * as responses from 'utils/tests/responses';

export const signUpError = graphql.mutation('CreateUser', (_, res, ctx) => {
  return res(
    ctx.errors(responses.signUpError),
  )
});

export const requestHandlers = [
  graphql.mutation('CreateUser', (_, res, ctx) => {
    return res(
      ctx.data(responses.createUser),
    )
  })
];
