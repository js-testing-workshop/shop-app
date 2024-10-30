import { RangeFilterConfig } from '../types/filter.ts';

export const priceFilterConfig: RangeFilterConfig = {
  type: 'range',
  title: 'Price',
  name: 'price',
  data: {
    min: 0,
    max: 85000,
  },
};

export const ratingFilterConfig: RangeFilterConfig = {
  type: 'range',
  title: 'Rating',
  name: 'rating',
  data: {
    min: 0,
    max: 5,
    precision: 2,
  },
};