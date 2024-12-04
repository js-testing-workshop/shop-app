import { render, screen, fireEvent } from '@testing-library/react';
import CustomAlert from './CustomAlert';
import { AlertType } from './alertContext';

describe('CustomAlert Component', () => {
  const mockOnClose = jest.fn();

  const renderComponent = (type: AlertType, message: string) => {
    render(<CustomAlert type={type} message={message} onClose={mockOnClose} />);
  };

  it('renders correctly', () => {
    renderComponent('success', 'Test message');
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('displays the correct message', () => {
    renderComponent('success', 'Test message');
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('applies the correct alert type class', () => {
    renderComponent('danger', 'Danger message');
    expect(screen.getByRole('alert')).toHaveClass('alert-danger');
  });

  it('calls onClose when the close button is clicked', () => {
    renderComponent('info', 'Info message');
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalled();
  });
});