import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FilterConfig, getFilterConfig } from '../../api/filter';
import { useAlert } from '../alert/useAlert';
import RangeSlider from './components/range-slider';
import CheckboxFilter from './components/checkbox-filter';

import './filter-style.css';

const updateCheckbox = (state: FilterConfig[], groupName: string, checkboxName: string, checkboxStatus: boolean): FilterConfig[] => {
  return state.map((config) => {
    if (config.type === 'checkboxes' && groupName === config.name) {
      return {
        ...config,
        data: config.data.map(item => {
          if (item.name === checkboxName) {
            return {
              ...item,
              checked: checkboxStatus
            };
          }
          return item;
        })
      };
    }
    return config;
  });
};

const updateRange = (state: FilterConfig[], groupName: string, value: { from: number, to: number }): FilterConfig[] => {
  return state.map((config) => {
    if (config.type === 'range' && groupName === config.name) {
      return {
        ...config,
        data: {
          ...config.data,
          value,
        },
      };
    }
    return config;
  });
};

interface FilterProps {
  onChange: (filterConfig: FilterConfig[]) => void;
}

const Filter: React.FC<FilterProps> = ({ onChange }) => {
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [filterConfig, setFilterConfig] = useState<FilterConfig[]>();
  const initialFilterConfigRef = useRef<FilterConfig[]>([]);
  // resetCounter is used to force re-render of RangeSlider component
  const [resetCounter, setResetCounter] = useState<number>(0);

  useEffect(() => {
    if (filterConfig) {
      onChange(filterConfig);
    }
  }, [filterConfig]);

  useEffect(() => {
    void (async () => {
      try {
        const config = await getFilterConfig();

        setFilterConfig(config);
        initialFilterConfigRef.current = config;
      } catch {
        setError(true);
        showAlert('danger', 'Something went wrong');
      }
      setLoading(false);
    })();
  }, []);

  const handleCheckboxChange = useCallback((groupName: string, checkboxName: string, checkboxStatus: boolean) => {
    setFilterConfig((prevState) => prevState ? updateCheckbox(prevState, groupName, checkboxName, checkboxStatus) : prevState);
  }, []);

  const handleRangeChange = useCallback((groupName: string, value: { from: number, to: number }) => {
    setFilterConfig((prevState) => prevState ? updateRange(prevState, groupName, value) : prevState);
  }, []);

  const getFilterGroupBody = (filter: FilterConfig, index: number) => {
    switch (filter.type) {
      case 'range':
        return <RangeSlider
          {...filter.data}
          key={`range-${index}-${resetCounter}`}
          onChange={(value) => handleRangeChange(filter.name, value)}
        />;
      case 'checkboxes':
        return <CheckboxFilter
          options={filter.data}
          onCheckboxChange={(checkboxName, checkboxStatus) => handleCheckboxChange(filter.name, checkboxName, checkboxStatus)}
        />;
      default:
        return 'Error: Unknown filter type';
    }
  };

  if (error) {
    return 'Something went wrong. Please try again later.';
  }

  if (loading || !filterConfig) {
    return 'Loading...';
  }

  return (
    <aside>
      <form className="os-filters-panel-content">
        {filterConfig.map((filter, index) => (
          <div className="os-form-group" key={filter.name}>
            <h3 className="os-form-title">{filter.title}</h3>
            <div className="os-form-body">
              {getFilterGroupBody(filter, index)}
            </div>
          </div>
        ))}
      </form>

      <button
        className="os-btn-primary clear-filters"
        type="button"
        onClick={() => {
          setFilterConfig(initialFilterConfigRef.current);
          setResetCounter((prev) => prev + 1);
        }}
      >CLEAR ALL FILTERS
      </button>
    </aside>
  );
};

export default Filter;