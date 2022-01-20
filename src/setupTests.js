// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import { server } from 'utils/tests/server';

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


jest.mock('react-router-dom', () => {
  // Require the original module to not be mocked...
  const originalModule = jest.requireActual('react-router-dom');

  return {
    __esModule: true,
    ...originalModule,
    useParams: jest.fn(),
    useHistory: jest.fn(),
    useNavigate: jest.fn(),
  };
});

jest.mock('urql', () => {
  // Require the original module to not be mocked...
  const originalModule = jest.requireActual('urql');

  return {
    __esModule: true,
    ...originalModule,
    executeQuery: jest.fn(),
    executeMutation: jest.fn(),
    executeSubscription: jest.fn(),
  };
});