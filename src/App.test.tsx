import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import Quiz from './Quiz';
import axios from 'axios';

test('Loader', () => {
	render(<App />);
	const linkElement = screen.getByText(/loading/i);
	expect(linkElement).toBeInTheDocument();
});

jest.mock('axios');

describe('fetchData', () => {
	it('fetches successfully data from an API', async () => {
		axios.get.mockImplementationOnce(() => Promise.resolve());
	});

	it('fetches erroneously data from an API', async () => {
		const errorMessage = 'Network Error';

		axios.get.mockImplementationOnce(() =>
			Promise.reject(new Error(errorMessage))
		);
	});
});
