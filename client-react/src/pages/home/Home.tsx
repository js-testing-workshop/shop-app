import React, { useState, useEffect, useCallback } from 'react';
import { getProducts, Product, ProductsQueryParams } from '../../api/products';
import { FilterConfig, SelectedFilter } from '../../api/filter';
import Pagination from '../../components/pagination';
import Search from '../../components/search';
import Header from '../../components/layout/header';
import CardsList from '../../components/cards-list/CardList';
import Filter from '../../components/filter';

import './home.css';

const extractSelectedFilters = (filters: FilterConfig[]): SelectedFilter[] => {
  return filters.map((filter) => {
    if (filter.type === 'checkboxes') {
      return {
        name: filter.name,
        type: filter.type,
        value: filter.data.filter((option) => option.checked).map((option) => option.name),
      };
    }

    if (filter.type === 'range') {
      return {
        name: filter.name,
        type: filter.type,
        value: filter.data.value!,
      };
    }

    throw new Error('Unknown filter');
  });
};

const PRODUCTS_PER_PAGE = 9;

const Home: React.FC = () => {
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

      setProducts(products);
      setTotalProductsCount(total);
    })();
  }, [queryParams]);

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
        <div><Filter onChange={handleFiltersChange}/></div>

        <section>
          <div>
            <Search onSearch={handleSearch}/>
          </div>

          <div data-element="cardsList" data-cy="products-list">
            <CardsList products={products}/>
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