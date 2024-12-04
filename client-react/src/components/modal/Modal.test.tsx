import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './Modal';

describe('Modal', () => {
  const mockOnClose = jest.fn();
  const component = <div>Test Component</div>;

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it('renders the modal with the provided component', () => {
    render(<Modal component={component} onClose={mockOnClose} />);

    expect(screen.getByText('Test Component')).toBeInTheDocument();
  });

  it('calls onClose when the Escape key is pressed', () => {
    render(<Modal component={component} onClose={mockOnClose} />);

    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    expect(mockOnClose).toHaveBeenCalled();
  });

  it.skip('calls onClose when clicking outside the modal', () => {
    render(<Modal component={component} onClose={mockOnClose} />);

    fireEvent.mouseDown(document);
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('does not call onClose when clicking inside the modal', () => {
    render(<Modal component={component} onClose={mockOnClose} />);

    fireEvent.mouseDown(screen.getByRole('dialog'));
    expect(mockOnClose).not.toHaveBeenCalled();
  });
});