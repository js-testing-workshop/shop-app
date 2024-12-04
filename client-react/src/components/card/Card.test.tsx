import { render, screen, fireEvent } from '@testing-library/react';
import Card from './Card';
import { Product } from '../../api/products';
import { CartProvider } from '../../providers/CartProvider';

const mockProduct: Product = {
  id: '1',
  title: 'Test Product',
  brand: 'Test Brand',
  category: 'Test Category',
  price: 100,
  rating: 4.5,
  images: ['test-image-url'],
};

describe('Card Component', () => {
  test('renders product details correctly', () => {
    render(
      <CartProvider>
        <Card data={mockProduct} />
      </CartProvider>
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Test Brand Test Category')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('4.5')).toBeInTheDocument();
    expect(screen).toMatchSnapshot();
  });

  test('renders Add to cart button initially', () => {
    render(
      <CartProvider>
        <Card data={mockProduct} />
      </CartProvider>
    );

    const button = screen.getByRole('button', { name: /Add to cart/i });
    expect(button).toBeInTheDocument();
  });

  test('toggles button text on click', () => {
    render(
      <CartProvider>
        <Card data={mockProduct} />
      </CartProvider>
    );

    const button = screen.getByRole('button', { name: /Add to cart/i });
    fireEvent.click(button);
    expect(button).toHaveTextContent('Remove from cart');

    fireEvent.click(button);
    expect(button).toHaveTextContent('Add to cart');
  });
});