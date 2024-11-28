import { CheckboxesFilterConfig, FilterConfig, RangeFilterConfig } from '../types/filter';
import { mapStringsToCheckboxesConfig } from '../components/filter/helpers';
import { getBrands, getCategories } from './products';

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

export const getFilterConfig = async (): Promise<FilterConfig[]> => {
  const [allCategories, allBrands] = await Promise.all([getCategories(), getBrands()]);
  const categoryFilterConfig: CheckboxesFilterConfig = {
    type: 'checkboxes',
    title: 'Category',
    name: 'category',
    data: mapStringsToCheckboxesConfig(allCategories),
  };

  const brandFilterConfig: CheckboxesFilterConfig = {
    type: 'checkboxes',
    title: 'Brand',
    name: 'brand',
    data: mapStringsToCheckboxesConfig(allBrands),
  };

  return [priceFilterConfig, categoryFilterConfig, brandFilterConfig, ratingFilterConfig];
};