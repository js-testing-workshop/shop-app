import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Header';
import { CartContextProps, useCart } from '../../../providers/CartProvider';

jest.mock('../../../providers/CartProvider');

const mockUseCart = useCart as jest.MockedFunction<typeof useCart>;

describe('Header Component', () => {
  beforeEach(() => {
    mockUseCart.mockReturnValue({ productsCount: 3 } as CartContextProps);
  });

  it('renders correctly with a title', () => {
    render(
      <Router>
        <Header pageTitle="Test Page" />
      </Router>
    );
    expect(screen.getByText('Test Page')).toBeInTheDocument();
  });

  it('renders correctly with the cart button', () => {
    render(
      <Router>
        <Header pageTitle="Test Page" withCartButton />
      </Router>
    );
    expect(screen.getByRole('button', { name: /cart/i })).toBeInTheDocument();
  });

  it('renders correctly without the cart button', () => {
    render(
      <Router>
        <Header pageTitle="Test Page" />
      </Router>
    );
    expect(screen.queryByRole('button', { name: /cart/i })).not.toBeInTheDocument();
  });

  it('displays the correct products count in the cart button', () => {
    render(
      <Router>
        <Header pageTitle="Test Page" withCartButton />
      </Router>
    );
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});