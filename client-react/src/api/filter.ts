import { getBrands, getCategories } from './products';

interface BaseFilterConfig {
  title: string;
  name: string;
}

export interface RangeFilterConfig extends BaseFilterConfig {
  type: 'range';
  data: {
    min: number;
    max: number;
    value?: {
      from: number;
      to: number;
    }
    precision?: number;
  };
}

export interface CheckboxesFilterConfig extends BaseFilterConfig {
  type: 'checkboxes';
  data: { name: string, title: string, checked?: boolean }[];
}

export type FilterConfig = RangeFilterConfig | CheckboxesFilterConfig;

interface SelectedRangeFilter {
  name: string;
  type: 'range';
  value: { from: number; to: number };
}

interface SelectedCheckboxesFilter {
  name: string;
  type: 'checkboxes';
  value: string[];
}

export type SelectedFilter = SelectedRangeFilter | SelectedCheckboxesFilter;

const priceFilterConfig: RangeFilterConfig = {
  type: 'range',
  title: 'Price',
  name: 'price',
  data: {
    min: 0,
    max: 85000,
  },
};

const ratingFilterConfig: RangeFilterConfig = {
  type: 'range',
  title: 'Rating',
  name: 'rating',
  data: {
    min: 0,
    max: 5,
    precision: 2,
  },
};


const prepareCheckboxesConfig = (arr: string[], title: string, name: string): CheckboxesFilterConfig => ({
  type: 'checkboxes',
  title,
  name,
  data: arr.map((item) => (
    {
      name: item.toLowerCase().split(' ').join('_'),
      title: item,
    }
  )),
});

export const getFilterConfig = async (): Promise<FilterConfig[]> => {
  const [allCategories, allBrands] = await Promise.all([getCategories(), getBrands()]);

  const categoryFilterConfig = prepareCheckboxesConfig(allCategories, 'Category', 'category');
  const brandFilterConfig = prepareCheckboxesConfig(allBrands, 'Brand', 'brand');

  return [priceFilterConfig, categoryFilterConfig, brandFilterConfig, ratingFilterConfig];
};