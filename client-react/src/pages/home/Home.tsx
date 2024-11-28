import React, { useState, useEffect, useCallback } from 'react';
import { getProducts } from '../../api/products';
import { useCart } from '../../providers/CartProvider';
import { ProductsCollection } from '../../providers/CartProvider/types';
import Pagination from '../../components/pagination';
import Search from '../../components/search';
import Header from '../../components/layout/header';
import { extractSelectedFilters } from '../../components/filter/helpers';
import CardsList from '../../components/cards-list/CardList';
import Filter from '../../components/filter';
import { Product, ProductsQueryParams } from '../../types/product';
import { FilterConfig } from '../../types/filter';
import { useUpdateEffect } from '../../hooks/use-update-effect';

import './home.css';

const PRODUCTS_PER_PAGE = 9;

const Home: React.FC = () => {
  const { productsInCart } = useCart();
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

      setProducts(syncProductsWithStorage(products, productsInCart));
      setTotalProductsCount(total);
    })();
  }, [queryParams]);

  useUpdateEffect(() => {
    setProducts((prev) => syncProductsWithStorage(prev, productsInCart));
  }, [productsInCart]);

  const syncProductsWithStorage = useCallback((productsToSync: Product[], productsInCart: ProductsCollection) => {
    return productsToSync.map((product: Product) => ({
      ...product,
      count: productsInCart[product.id]?.count ?? 0
    }));
  }, []);

  const handleSearch = useCallback((search: string) => {
    setQueryParams((prev) => ({ ...prev, page: 1, search }));
  }, []);

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
            <CardsList products={products} />
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