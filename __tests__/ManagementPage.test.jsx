import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ManagementPage from '../src/app/management/page';
import { auth } from '../firebase.config'; // Adjust the path if necessary
import { getAllDocuments } from '../src/utils/firebaseUtils'; // Adjust the path if necessary
import '@testing-library/jest-dom';

// Mock the `useRouter` hook from Next.js
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock Firebase utility functions
jest.mock('../src/utils/firebaseUtils', () => ({
  getAllDocuments: jest.fn(),
}));

// Mock auth methods
jest.mock('../firebase.config', () => ({
  auth: {
    onAuthStateChanged: jest.fn((callback) => {
      callback({ uid: 'test-id' }); // Simulate logged-in user
      return jest.fn(); // Return a no-op function for unsubscribe
    }),
  },
}));

describe('ManagementPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders basic UI elements', () => {
    render(<ManagementPage />);

    // Check if basic UI elements are rendered
    expect(screen.getByText(/track your expenses/i)).toBeInTheDocument();
    expect(screen.queryByText(/you are not logged in./i)).not.toBeInTheDocument();
  });

  test('displays message when user is not authenticated', () => {
    // Simulate no user logged in
    auth.onAuthStateChanged.mockImplementation((callback) => callback(null));

    render(<ManagementPage />);

    // Check if the message for unauthenticated users is displayed
    expect(screen.getByText(/you are not logged in./i)).toBeInTheDocument();
    expect(screen.getByText(/please log in to access the expense tracking features./i)).toBeInTheDocument();
  });

  test('renders expenses and calculates total correctly', async () => {
    // Mock authenticated user and fetch some expenses
    auth.onAuthStateChanged.mockImplementation((callback) => callback({ uid: 'test-id' }));
    getAllDocuments.mockResolvedValue([
      { name: 'Test Item 1', amount: '10', id: '1', userId: 'test-id' },
      { name: 'Test Item 2', amount: '20', id: '2', userId: 'test-id' }
    ]);

    render(<ManagementPage />);

    // Wait for expenses to be fetched and displayed
    await waitFor(() => {
      expect(screen.getByText(/Test Item 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Test Item 2/i)).toBeInTheDocument();
      expect(screen.getByText(/total expenses: \$30.00/i)).toBeInTheDocument();
    });
  });
});
