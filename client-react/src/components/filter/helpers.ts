import { CheckboxesFilterConfig, FilterConfig, SelectedFilter } from '../../types/filter.ts';

export const mapStringsToCheckboxesConfig = (arr: string[]): CheckboxesFilterConfig['data'] => arr.map((item) => {
  return {
    name: item.toLowerCase().split(' ').join('_'),
    title: item,
  };
});

export const extractSelectedFilters = (filters: FilterConfig[]): SelectedFilter[] => {
  return filters.map((filter) => {
    if (filter.type === 'checkboxes') {
      return {
        name: filter.name,
        type: filter.type,
        value: filter.data.filter((option) => option.checked).map((option) => option.name),
      }
    }

    if (filter.type === 'range') {
      return {
        name: filter.name,
        type: filter.type,
        value: filter.data.value!,
      }
    }

    throw new Error('Unknown filter');
  })
};
