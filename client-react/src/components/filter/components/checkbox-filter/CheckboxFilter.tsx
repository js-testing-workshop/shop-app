import React from 'react';
import { CheckboxesFilterConfig } from '../../../../types/filter';

import './checkbox-filter-style.css';

interface CheckboxFilterProps {
  options: CheckboxesFilterConfig['data'];
  onCheckboxChange: (name: string, checked: boolean) => void;
}

const CheckboxFilter: React.FC<CheckboxFilterProps> = ({ options, onCheckboxChange }) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    onCheckboxChange(event.target.id, event.target.checked);
  };

  return (
    <ul className="os-filters-panel">
      {options.map((item, index) => (
        <li className="os-filters-panel-item" key={index}>
          <div className="os-form-checkbox">
            <input id={item.name} type="checkbox" checked={item?.checked} onChange={handleChange}/>
            <label htmlFor={item.name}>{item.title}</label>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CheckboxFilter;