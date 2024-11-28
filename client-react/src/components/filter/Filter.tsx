import React, { useCallback, useEffect, useState } from 'react';
import { FilterConfig } from '../../types/filter';
import { getFilterConfig } from '../../api/filter';
import { useAlert } from '../alert/useAlert';
import RangeSlider from './components/range-slider';
import CheckboxFilter from './components/checkbox-filter';

import './filter-style.css';

interface FilterProps {
  onChange: (filterConfig: FilterConfig[]) => void;
}

const Filter: React.FC<FilterProps> = ({ onChange }) => {
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [filterConfig, setFilterConfig] = useState<FilterConfig[]>();

  useEffect(() => {
    if (filterConfig) {
      onChange(filterConfig)
    }
  }, [filterConfig]);

  useEffect(() => {
    void (async () => {
      try {
        const config = await getFilterConfig();

        setFilterConfig(config);
      } catch {
        setError(true);
        showAlert('danger', 'Something went wrong');
      }
      setLoading(false);
    })();
  }, []);

  const handleCheckboxChange = useCallback((groupName: string, checkboxName: string, checkboxStatus: boolean) => {
    setFilterConfig((prev) => {
      return prev?.map((config) => {
        if (config.type === 'checkboxes' && groupName === config.name) {
          return {
            ...config,
            data: config.data.map(item => {
              if (item.name === checkboxName) {
                return {
                  ...item,
                  checked: checkboxStatus
                }
              }
              return item;
            })
          };
        }
        return config;
      });
    });
  }, []);

  const handleRangeChange = useCallback((groupName: string, value: {from: number, to: number}) => {
    setFilterConfig((prev) => {
      return prev?.map((config) => {
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
    });
  }, []);

  const getFilterGroupBody = (filter: FilterConfig) => {
    switch (filter.type) {
      case 'range':
        return <RangeSlider {...filter.data} onChange={(value) => handleRangeChange(filter.name, value)} />;
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
        {filterConfig.map((filter) => (
          <div className="os-form-group" key={filter.name}>
            <h3 className="os-form-title">{filter.title}</h3>
            <div className="os-form-body">
              {getFilterGroupBody(filter)}
            </div>
          </div>
        ))}
      </form>

      <button className="os-btn-primary clear-filters" type="button">CLEAR ALL FILTERS</button>
    </aside>
  );
};

export default Filter;