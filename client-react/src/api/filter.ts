import { CheckboxesFilterConfig, FilterConfig } from '../types/filter.ts';
import { priceFilterConfig, ratingFilterConfig } from '../fixtures/filter.ts';
import { getBrands, getCategories } from './products.ts';
import { mapStringsToCheckboxesConfig } from '../components/filter/helpers.ts';

export const getFilterConfig = async (): Promise<FilterConfig[]> => {
  const allCategories = await getCategories();
  const categoryFilterConfig: CheckboxesFilterConfig = {
    type: 'checkboxes',
    title: 'Category',
    name: 'category',
    data: mapStringsToCheckboxesConfig(allCategories),
  };

  const allBrands = await getBrands();
  const brandFilterConfig: CheckboxesFilterConfig = {
    type: 'checkboxes',
    title: 'Brand',
    name: 'brand',
    data: mapStringsToCheckboxesConfig(allBrands),
  };

  return [priceFilterConfig, categoryFilterConfig, brandFilterConfig, ratingFilterConfig]
}