import {graphql} from 'msw';
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

export const getProjectsEmpty = graphql.query('GetProjects', (_, res, ctx) => {
  return res(
    ctx.data(responses.getProjectsEmpty),
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
  }),
  graphql.mutation('CreateTask', (_, res, ctx) => {
    return res(
      ctx.data(responses.createTask),
    )
  }),
  graphql.mutation('DeleteTask', (_, res, ctx) => {
    return res(
      ctx.data(responses.deleteTask),
    )
  }),
  graphql.query('GetProjects', (_, res, ctx) => {
    return res(
      ctx.data(responses.getProjects),
    )
  })
];
