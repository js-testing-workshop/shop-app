import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { AlertProvider, AlertContext } from './alertContext';

describe('AlertProvider Component', () => {
  jest.useFakeTimers();

  const TestComponent = () => {
    const { showAlert } = React.useContext(AlertContext)!;
    return (
      <button onClick={() => showAlert('success', 'Test Alert', 2000)}>
        Show Alert
      </button>
    );
  };

  it('renders provider correctly', () => {
    render(
      <AlertProvider>
        <div>Test</div>
      </AlertProvider>
    );
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('shows alert with correct message and type', () => {
    render(
      <AlertProvider>
        <TestComponent />
      </AlertProvider>
    );

    fireEvent.click(screen.getByText('Show Alert'));
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Test Alert')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveClass('alert-success');
  });

  it('automatically closes alert after duration', () => {
    render(
      <AlertProvider>
        <TestComponent />
      </AlertProvider>
    );

    fireEvent.click(screen.getByText('Show Alert'));
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('closes alert when close button is clicked', () => {
    render(
      <AlertProvider>
        <TestComponent />
      </AlertProvider>
    );

    fireEvent.click(screen.getByText('Show Alert'));
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});