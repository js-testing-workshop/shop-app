import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination', () => {
  const mockOnPageChange = jest.fn();

  beforeEach(() => {
    mockOnPageChange.mockClear();
  });

  it('does not render pagination if totalPages is less than 2', () => {
    const { container } = render(<Pagination currentPage={1} totalPages={1} onPageChange={mockOnPageChange} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders pagination with correct number of pages', () => {
    render(<Pagination currentPage={1} totalPages={3} onPageChange={mockOnPageChange} />);
    expect(screen.getAllByRole('button').length).toBe(4);
  });

  it('calls onPageChange with correct page number when a page button is clicked', () => {
    render(<Pagination currentPage={1} totalPages={3} onPageChange={mockOnPageChange} />);
    fireEvent.click(screen.getByText('2'));
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange with previous page number when previous button is clicked', () => {
    render(<Pagination currentPage={2} totalPages={3} onPageChange={mockOnPageChange} />);
    fireEvent.click(screen.getByRole('button', { name: /previous page/i }));
    expect(mockOnPageChange).toHaveBeenCalledWith(1);
  });

  it('calls onPageChange with next page number when next button is clicked', () => {
    render(<Pagination currentPage={2} totalPages={3} onPageChange={mockOnPageChange} />);
    fireEvent.click(screen.getByRole('button', { name: /next page/i }));
    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  it('hides previous button on the first page', () => {
    render(<Pagination currentPage={1} totalPages={3} onPageChange={mockOnPageChange} />);
    expect(screen.queryByRole('button', { name: /previous page/i })).toBeFalsy();
  });

  it('hides next button on the last page', () => {
    render(<Pagination currentPage={3} totalPages={3} onPageChange={mockOnPageChange} />);
    expect(screen.queryByRole('button', { name: /next page/i })).toBeFalsy();
  });
});