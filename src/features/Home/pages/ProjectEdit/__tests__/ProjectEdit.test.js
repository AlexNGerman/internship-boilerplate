import React from "react";
import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {useNavigate} from 'react-router-dom';
import {ThemeProvider} from '@mui/material/styles';
import renderComponent from 'utils/tests/renderComponent';
import ProjectEdit from 'features/Home/pages/ProjectEdit';
import theme from "utils/theme";

jest.mock('react-router-dom', () => ({
  useParams: () => ({
    id: 3,
  }),
  useNavigate: jest.fn(),
}));

describe('ProjectEdit', () => {
  const render = () => renderComponent(
    <ThemeProvider theme={theme}>
      <ProjectEdit />
    </ThemeProvider>
  );
  const navigate = jest.fn();

  describe('with valid data', () => {
    it('redirects to project page', async () => {
      useNavigate.mockReturnValue(navigate);
      render();

      await waitFor(() => {
        expect(screen.getByTestId('title')).toBeInTheDocument();
      }, {timeout: 3000});

      await waitFor(() => {
        expect(screen.getByTestId('description')).toBeInTheDocument();
      }, {timeout: 3000});

      userEvent.type(screen.getByTestId('title'), 'tests title');
      userEvent.type(screen.getByTestId('description'), 'tests description');
      userEvent.click(screen.getByTestId('submit'));

      await waitFor(() => {
        expect(navigate).toBeCalledWith('/project/3');
      }, {timeout: 3000});
    });
  })

  describe('with invalid data', () => {
    describe('with too short title and description', () => {
      it('renders correct errors', async () => {
        render();

        await waitFor(() => {
          expect(screen.getByTestId('title')).toBeInTheDocument();
        }, {timeout: 3000});

        await waitFor(() => {
          expect(screen.getByTestId('description')).toBeInTheDocument();
        }, {timeout: 3000});

        const inputTitle = screen.getByTestId('title');
        const inputDescription = screen.getByTestId('description');

        userEvent.clear(inputTitle);
        userEvent.clear(inputDescription);
        userEvent.type(inputTitle, 't');
        userEvent.type(inputDescription, 'd');

        await waitFor(() => {
          expect(screen.getByText('Title can\'t be less than 2 characters')).toBeInTheDocument()
        });
        await waitFor(() => {
          expect(screen.getByText('Description can\'t be less than 2 characters')).toBeInTheDocument()
        });
      });
    });

    describe('with too long title and description', () => {
      it('renders correct errors', async () => {
        render();

        await waitFor(() => {
          expect(screen.getByTestId('title')).toBeInTheDocument();
        }, {timeout: 3000});

        await waitFor(() => {
          expect(screen.getByTestId('description')).toBeInTheDocument();
        }, {timeout: 3000});

        userEvent.type(screen.getByTestId('title'), 'title title title title title title title title title title title title');
        userEvent.type(screen.getByTestId('description'), 'description description description description description description description');
        userEvent.click(screen.getByTestId('submit'))

        await waitFor(() => {
          expect(screen.getByText('Title can\'t be longer than 50 characters')).toBeInTheDocument()
        });
        await waitFor(() => {
          expect(screen.getByText('Description can\'t be longer than 50 characters')).toBeInTheDocument()
        });
      });
    });

    describe('with empty fields', () => {
      it('renders correct errors', async () => {
        render();

        await waitFor(() => {
          expect(screen.getByTestId('title')).toBeInTheDocument();
        });

        await waitFor(() => {
          expect(screen.getByTestId('description')).toBeInTheDocument();
        });

        userEvent.clear(screen.getByTestId('title'));
        userEvent.clear(screen.getByTestId('description'));
        userEvent.click(screen.getByTestId('submit'))

        await waitFor(() => {
          expect(screen.getByText('Please enter title')).toBeInTheDocument();
        });

        await waitFor(() => {
          expect(screen.getByText('Please enter description')).toBeInTheDocument();
        });
      });
    });
  });
});
