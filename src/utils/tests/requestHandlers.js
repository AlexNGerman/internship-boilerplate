import { graphql } from 'msw';
import * as responses from 'utils/tests/responses';

export const signUpError = graphql.mutation('CreateUser', (_, res, ctx) => {
  return res(
    ctx.errors(responses.signUpError),
  )
});

export const signInError = graphql.mutation('SignInUser', (_, res, ctx) => {
  return res(
    ctx.errors(responses.signInError),
  )
});

export const requestHandlers = [
  graphql.mutation('CreateUser', (_, res, ctx) => {
    return res(
      ctx.data(responses.createUser),
    )
  }),
  graphql.mutation('SignInUser', (_, res, ctx) => {
    return res(
      ctx.data(responses.signInUser),
    )
  }),
  graphql.mutation('CreateProject', (_, res, ctx) => {
    return res(
      ctx.data(responses.createProject),
    )
  })
];
