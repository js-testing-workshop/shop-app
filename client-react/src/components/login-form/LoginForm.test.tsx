import { render, screen, fireEvent } from '@testing-library/react';
import { UserContextProps, useUser } from '../../providers/UserProvider';
import LoginForm from './LoginForm';

// Mock the useUser hook
jest.mock('../../providers/UserProvider');

const mockUseUser = useUser as jest.MockedFunction<typeof useUser>;

describe('LoginForm', () => {
  beforeEach(() => {
    mockUseUser.mockReturnValue({
      login: jest.fn().mockResolvedValue(undefined),
    } as unknown as UserContextProps);
  });

  it('renders login form', () => {
    render(<LoginForm />);

    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('shows validation errors when form is submitted with empty fields', () => {
    render(<LoginForm />);

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(screen.getByText('Please fill email')).toBeInTheDocument();
    expect(screen.getByText('Please fill password')).toBeInTheDocument();
  });

  it('calls login function with correct data when form is submitted', () => {
    const mockLogin = jest.fn().mockResolvedValue(undefined);
    mockUseUser.mockReturnValue({
      login: mockLogin,
    } as unknown as UserContextProps);

    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(mockLogin).toHaveBeenCalledWith({
      data: { email: 'test@example.com', password: 'password' },
      onSuccess: undefined,
      onFailure: expect.any(Function),
    });
  });

  it('shows loading spinner when form is submitting', () => {
    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it.skip('shows invalid credentials message on login failure', async () => {
    const mockLogin = jest.fn().mockImplementation(({ onFailure }) => onFailure());
    mockUseUser.mockReturnValue({
      login: mockLogin,
    } as unknown as UserContextProps);

    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(await screen.findByText('Invalid Credentials')).toBeInTheDocument();
  });
});