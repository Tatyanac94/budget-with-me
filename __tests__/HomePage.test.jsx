import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HomePage from '@/app/page';
import '@testing-library/jest-dom';
import { registerUser, login } from '../src/utils/useAuth';
import { useRouter } from 'next/navigation';


// Mock the `useRouter` hook from Next.js
jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

// Mock the `registerUser` and `login` functions from `useAuth`
jest.mock('../src/utils/useAuth', () => ({
  registerUser: jest.fn(),
  login: jest.fn(),
}));

test('renders homepage with welcome message', () => {
  render(<HomePage />);
  expect(screen.getByText(/Welcome to Budget With Me/i)).toBeInTheDocument();
  expect(screen.getByText(/Track your expenses to manage your budget effectively./i)).toBeInTheDocument();
});

test('updates registration form fields on change', () => {
  render(<HomePage />);

  fireEvent.change(screen.getByPlaceholderText(/Name/i), { target: { value: 'John Doe' } });
  fireEvent.change(screen.getAllByPlaceholderText(/Email/i)[0], { target: { value: 'john@example.com' } });
  fireEvent.change(screen.getAllByPlaceholderText(/Password/i)[0], { target: { value: 'password123' } });

  expect(screen.getByPlaceholderText(/Name/i).value).toBe('John Doe');
  expect(screen.getAllByPlaceholderText(/Email/i)[0].value).toBe('john@example.com');
  expect(screen.getAllByPlaceholderText(/Password/i)[0].value).toBe('password123');
});

test('updates login form fields on change', () => {
  render(<HomePage />);

  fireEvent.change(screen.getAllByPlaceholderText(/Email/i)[1], { target: { value: 'john@example.com' } });
  fireEvent.change(screen.getAllByPlaceholderText(/Password/i)[1], { target: { value: 'password123' } });

  expect(screen.getAllByPlaceholderText(/Email/i)[1].value).toBe('john@example.com');
  expect(screen.getAllByPlaceholderText(/Password/i)[1].value).toBe('password123');
});


