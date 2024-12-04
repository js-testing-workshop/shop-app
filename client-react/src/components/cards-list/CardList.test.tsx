import { render, screen } from '@testing-library/react';
import CardsList from './CardList';
import { Product } from '../../api/products';

const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Product 1',
    brand: 'Brand 1',
    category: 'Category 1',
    price: 100,
    rating: 4.5,
    images: ['image1.jpg'],
  },
  {
    id: '2',
    title: 'Product 2',
    brand: 'Brand 2',
    category: 'Category 2',
    price: 200,
    rating: 4.0,
    images: ['image2.jpg'],
  },
];

describe.skip('CardsList Component', () => {
  it('renders correctly with products', () => {
    render(<CardsList products={mockProducts} />);
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen).toMatchSnapshot();
  });

  it('renders correctly with no products', () => {
    render(<CardsList products={[]} />);
    expect(screen.getByText('No products found')).toBeInTheDocument();
    expect(screen).toMatchSnapshot();
  });
});