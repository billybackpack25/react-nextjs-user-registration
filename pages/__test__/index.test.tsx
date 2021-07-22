import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../index.tsx';

test('it should vaildate length', async () => {
    const {findByLabelText, findByText, findByRole} = render(<Home />);
    const input = await findByLabelText('Password');

    await act(async () => {
        fireEvent.input(input, {target: {value: 'adcb'}});  // Add text
        fireEvent.submit(await findByRole('button'));       // Submit the form

        const error = await findByText('Must be 8 characters');
        expect(error).toBeInTheDocument();

    });
    
});

test('it should vaildate complexity', async () => {
    const {findByLabelText, findByText, findByRole} = render(<Home />);
    const input = await findByLabelText('Password');

    await act(async () => {
        fireEvent.input(input, {target: {value: 'adcbesdas'}});  // Add text
        fireEvent.submit(await findByRole('button'));           // Submit the form

        const error = await findByText(/must include lower/);
        expect(error).toBeInTheDocument();

    });
    
});