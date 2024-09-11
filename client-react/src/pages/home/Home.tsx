import React, { useState, useEffect, useCallback } from 'react';
// import Pagination from '../../components/pagination/index.js';
// import SideBar from '../../components/side-bar/index.js';
// import Search from '../../components/search/index.js';
import CardsList from '../../components/cards-list/CardList.tsx';
// import { prepareFilters } from './prepare-filters.js';
import productStore from '../../storage/product-store.ts';
import { getProducts } from '../../api/products.ts';
import { Link } from 'react-router-dom';
import './home.css';
import Search from '../../components/search/Search.tsx';
import { Product } from '../../models/Product.ts';

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters] = useState(new URLSearchParams());
  const pageLimit = 9;

  useEffect(() => {
    filters.set('_page', '1');
    filters.set('_limit', pageLimit.toString());
  }, [filters]);

  const handleSearch = useCallback(async (title: string) => {
    filters.set("_page", "1");
    filters.set("q", title);
    const data = await getProducts(filters);
    setProducts(data.products);

    // components.cardsList.update(products);
    // Re-render the components that depend on the product store
    // renderComponents();
  }, [filters]);

  useEffect(() => {
    void handleSearch('');
  }, [handleSearch]);
  
  const handleAddToCart = (id: string) => {
    // Implement add to cart functionality here
    console.log('Added to cart:', id);
  };

  const handleRemoveFromCart = (id: string) => {
    // Implement remove from cart functionality here
    console.log('Removed from cart:', id);
  };

  const template = () => {
    const totalProducts = productStore.getProductsCount();
    // const totalProducts = 6;
    const cartBtnClass = totalProducts > 0 ? '' : 'hidden';

    return (
      <div className="os-container">
        <header className="os-header">
          <h2 className="app-page-title">Home Page</h2>
          <Link to="/cart">
            <button
              className="cart-btn os-btn-primary"
              data-element="cartBtn"
              data-cy="cart-btn"
            >
              <i className="bi bi-cart"></i>
              Cart{' '}
              <span
                className={`${cartBtnClass} cart-count`}
                data-element="cartCounter"
              >
                {totalProducts}
              </span>
            </button>
          </Link>
        </header>

        <main className="os-products">
          <div data-element="sideBar">{/* SideBar */}</div>

          <section>
            <div data-element="search">
              <Search onSearch={handleSearch} />
            </div>

            <div data-element="cardsList" data-cy="products-list">
            <CardsList
                products={products}
                onAddToCart={handleAddToCart}
                onRemoveFromCart={handleRemoveFromCart}
              />
            </div>

            <footer data-element="pagination" className="os-products-footer">
              {/* Pagination */}
            </footer>
          </section>
        </main>
      </div>
    );
  };

  return template();
};

export default Home;