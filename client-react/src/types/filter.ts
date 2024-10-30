export interface BaseFilterConfig {
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

export interface SelectedRangeFilter {
  name: string;
  type: 'range';
  value: { from: number; to: number };
}

export interface SelectedCheckboxesFilter {
  name: string;
  type: 'checkboxes';
  value: string[];
}

export type SelectedFilter = SelectedRangeFilter | SelectedCheckboxesFilter;