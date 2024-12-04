import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserContextProps, useUser } from '../../../providers/UserProvider';
import NavigationBar from './NavigationBar';

// Mock the useUser hook
jest.mock('../../../providers/UserProvider');

const mockUseUser = useUser as jest.MockedFunction<typeof useUser>;

describe('NavigationBar', () => {
  beforeEach(() => {
    mockUseUser.mockReturnValue({
      logout: jest.fn().mockResolvedValue(undefined),
      isAuthorized: false,
    } as unknown as UserContextProps);
  });

  it('renders navigation links', () => {
    render(
      <Router>
        <NavigationBar />
      </Router>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('shows login button when not authorized', () => {
    render(
      <Router>
        <NavigationBar />
      </Router>
    );

    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('shows logout button when authorized', () => {
    mockUseUser.mockReturnValue({
      logout: jest.fn().mockResolvedValue(undefined),
      isAuthorized: true,
    } as unknown as UserContextProps);

    render(
      <Router>
        <NavigationBar />
      </Router>
    );

    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('opens login modal on login button click', () => {
    render(
      <Router>
        <NavigationBar />
      </Router>
    );

    fireEvent.click(screen.getByText('Login'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('calls logout function on logout button click', () => {
    const mockLogout = jest.fn().mockResolvedValue(undefined);
    mockUseUser.mockReturnValue({
      logout: mockLogout,
      isAuthorized: true,
    } as unknown as UserContextProps);

    render(
      <Router>
        <NavigationBar />
      </Router>
    );

    fireEvent.click(screen.getByText('Logout'));
    expect(mockLogout).toHaveBeenCalled();
  });
});