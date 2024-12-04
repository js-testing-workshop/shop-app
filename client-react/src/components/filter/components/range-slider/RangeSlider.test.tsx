import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RangeSlider from './RangeSlider';
import { RangeFilterConfig } from '../../../../api/filter';

const mockOnChange = jest.fn();

const mockRangeConfig: RangeFilterConfig['data'] = {
  min: 0,
  max: 100,
  precision: 0
};

describe('RangeSlider Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<RangeSlider {...mockRangeConfig} onChange={mockOnChange} />);
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it.skip('handles left thumb movement', async () => {
    render(<RangeSlider {...mockRangeConfig} onChange={mockOnChange} />);
    const leftThumb = screen.getByRole('slider', { name: /left/i });
    fireEvent.pointerDown(leftThumb);
    fireEvent.pointerMove(leftThumb, { clientX: 30 });
    fireEvent.pointerUp(leftThumb);
    await waitFor(() => expect(mockOnChange).toHaveBeenCalledWith({ from: 30, to: 100 }));
  });

  it.skip('handles right thumb movement', () => {
    render(<RangeSlider {...mockRangeConfig} onChange={mockOnChange} />);
    const rightThumb = screen.getByRole('slider', { name: /right/i });
    fireEvent.pointerDown(rightThumb);
    fireEvent.pointerMove(rightThumb, { clientX: -70 });
    fireEvent.pointerUp(rightThumb);
    expect(mockOnChange).toHaveBeenCalledWith({ from: 0, to: 30 });
  });

  it.skip('calls onChange with correct values', () => {
    render(<RangeSlider {...mockRangeConfig} onChange={mockOnChange} />);
    const leftThumb = screen.getByRole('slider', { name: /left/i });
    const rightThumb = screen.getByRole('slider', { name: /right/i });

    fireEvent.pointerDown(leftThumb);
    fireEvent.pointerMove(leftThumb, { clientX: 20 });
    fireEvent.pointerUp(leftThumb);

    fireEvent.pointerDown(rightThumb);
    fireEvent.pointerMove(rightThumb, { clientX: -50 });
    fireEvent.pointerUp(rightThumb);

    expect(mockOnChange).toHaveBeenCalledWith({ from: 20, to: 50 });
  });
});