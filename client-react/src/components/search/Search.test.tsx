import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from './Search';

describe('Search Component', () => {
  test('renders search input', () => {
    render(<Search onSearch={jest.fn()} />);
    const inputElement = screen.getByPlaceholderText(/search/i);
    expect(inputElement).toBeInTheDocument();
  });

  test.skip('calls onSearch with debounced input', async () => {
    jest.useFakeTimers();
    const onSearchMock = jest.fn();
    render(<Search onSearch={onSearchMock} />);

    const inputElement = screen.getByPlaceholderText(/search/i);
    userEvent.type(inputElement, 'test');

    // Fast-forward debounce time
    jest.advanceTimersByTime(300);

    expect(onSearchMock).toHaveBeenCalledWith('test');
    jest.useRealTimers();
  });

  test('updates input value on change', () => {
    render(<Search onSearch={jest.fn()} />);
    const inputElement = screen.getByPlaceholderText(/search/i);
    fireEvent.change(inputElement, { target: { value: 'new value' } });
    expect(inputElement).toHaveValue('new value');
  });
});