import React, { useState, useEffect, useCallback } from 'react';
import { getProducts } from '../../api/products.ts';
import { useCart } from '../../providers/CartProvider';
import { ProductsCollection } from '../../providers/CartProvider/types.ts';
import { useAlert } from '../../components/alert/useAlert.ts';
import Pagination from '../../components/pagination';
import Search from '../../components/search';
import Header from '../../components/layout/header';
import CardsList from '../../components/cards-list/CardList.tsx';
import { ProductsFilter, Product } from '../../types/product.ts';
import { useUpdateEffect } from '../../hooks/use-update-effect.ts';
import './home.css';

const PRODUCTS_PER_PAGE = 9;

const Home: React.FC = () => {
  const { showAlert } = useAlert();
  const { addToCart, removeFromCart, productsCollection } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProductsCount, setTotalProductsCount] = useState<number>(0);
  const [filters, setFilters] = useState<ProductsFilter>({
    page: 1,
    limit: PRODUCTS_PER_PAGE,
    query: '',
  });

  useEffect(() => {
    void (async () => {
      const { products, total } = await getProducts(filters);

      setProducts(syncProductsWithStorage(products, productsCollection));
      setTotalProductsCount(total);
    })();
  }, [filters]);

  useUpdateEffect(() => {
    setProducts((prev) => syncProductsWithStorage(prev, productsCollection));
  }, [productsCollection]);

  const syncProductsWithStorage = (productsToSync: Product[], productsCollection: ProductsCollection) => {
    return productsToSync.map((product: Product) => ({
      ...product,
      count: productsCollection[product.id]?.count ?? 0
    }));
  };

  const handleSearch = useCallback((title: string) => {
    setFilters((prev) => ({ ...prev, page: 1, query: title }));
  }, []);


  const handleAddToCart = (id: string) => {
    const product = products.find((product) => product.id === id);
    if (product) {
      addToCart(product);
    } else {
      showAlert('danger', 'Product not found');
    }
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  return (
    <div className="os-container">
      <Header pageTitle="Home Page" withCartButton/>

      <main className="os-products">
        <div data-element="sideBar">{/* SideBar 111 */}</div>

        <section>
          <div data-element="search">
            <Search onSearch={handleSearch}/>
          </div>

          <div data-element="cardsList" data-cy="products-list">
            <CardsList
              products={products}
              onAddToCart={handleAddToCart}
              onRemoveFromCart={removeFromCart}
            />
          </div>

          <footer className="os-products-footer">
            <Pagination
              totalPages={Math.ceil(totalProductsCount / PRODUCTS_PER_PAGE)}
              currentPage={filters.page}
              onPageChange={handlePageChange}
            />
          </footer>
        </section>
      </main>
    </div>
  );
};

export default Home;