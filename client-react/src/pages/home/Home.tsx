import React, { useState, useEffect, useCallback } from 'react';
import { getProducts } from '../../api/products.ts';
import { useCart } from '../../providers/CartProvider';
import { ProductsCollection } from '../../providers/CartProvider/types.ts';
import { useAlert } from '../../components/alert/useAlert.ts';
import Pagination from '../../components/pagination';
import Search from '../../components/search';
import Header from '../../components/layout/header';
import CardsList from '../../components/cards-list/CardList.tsx';
import Filter from '../../components/filter';
import { Product, ProductsQueryParams } from '../../types/product.ts';
import { useUpdateEffect } from '../../hooks/use-update-effect.ts';
import { FilterConfig } from '../../types/filter.ts';
import { extractSelectedFilters } from '../../components/filter/helpers.ts';

import './home.css';

const PRODUCTS_PER_PAGE = 9;

const Home: React.FC = () => {
  const { showAlert } = useAlert();
  const { addToCart, removeFromCart, productsCollection } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProductsCount, setTotalProductsCount] = useState<number>(0);
  const [queryParams, setQueryParams] = useState<ProductsQueryParams>({
    page: 1,
    limit: PRODUCTS_PER_PAGE,
    search: '',
    filters: [],
  });

  useEffect(() => {
    void (async () => {
      const { products, total } = await getProducts(queryParams);

      setProducts(syncProductsWithStorage(products, productsCollection));
      setTotalProductsCount(total);
    })();
  }, [queryParams]);

  useUpdateEffect(() => {
    setProducts((prev) => syncProductsWithStorage(prev, productsCollection));
  }, [productsCollection]);

  const syncProductsWithStorage = useCallback((productsToSync: Product[], productsCollection: ProductsCollection) => {
    return productsToSync.map((product: Product) => ({
      ...product,
      count: productsCollection[product.id]?.count ?? 0
    }));
  }, []);

  const handleSearch = useCallback((search: string) => {
    setQueryParams((prev) => ({ ...prev, page: 1, search }));
  }, []);


  const handleAddToCart = useCallback((id: string) => {
    const product = products.find((product) => product.id === id);
    if (product) {
      addToCart(product);
    } else {
      showAlert('danger', 'Product not found');
    }
  }, [addToCart, products, showAlert]);

  const handlePageChange = useCallback((page: number) => {
    setQueryParams((prev) => ({ ...prev, page }));
  }, []);

  const handleFiltersChange = useCallback((filters: FilterConfig[]) => {
    setQueryParams((prev) => ({ ...prev, filters: extractSelectedFilters(filters) }));
  }, []);

  return (
    <div className="os-container">
      <Header pageTitle="Home Page" withCartButton/>

      <main className="os-products">
        <div><Filter onChange={handleFiltersChange} /></div>

        <section>
          <div>
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
              totalPages={Math.ceil(totalProductsCount / queryParams.limit)}
              currentPage={queryParams.page}
              onPageChange={handlePageChange}
            />
          </footer>
        </section>
      </main>
    </div>
  );
};

export default Home;