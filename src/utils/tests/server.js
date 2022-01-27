import { setupServer } from 'msw/node';

import { requestHandlers } from 'utils/tests/requestHandlers';

export const server = setupServer(...requestHandlers);
