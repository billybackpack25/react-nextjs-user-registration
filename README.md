# User Registration

## Run a next JS project

`npm run dev`

## Installs

```bash
npm install react-hook-form
npm install --save react-google-recaptcha
yarn add -D @testing-library/jest-dom @testing-library/react babel-jest jest # Testing
```

## Add Jest to Next.js

https://www.kyrelldixon.com/blog/setup-jest-and-react-testing-library-with-nextjs

## Form

This is in index.tsx

## Tests

Validating input for the password, making sure it meets the complexity requirements

```ts
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
```