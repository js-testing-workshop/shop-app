import React, { useState, useEffect } from 'react';
import useDebounce from './useDebounce';
import './search-style.css';

interface SearchProps {
  onSearch: (title: string) => unknown;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <form>
      <div className="os-form-input use-icon">
        <input
          id="search-input"
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search"
        />
        <label className="bi bi-search input-icon" htmlFor="search-input"></label>
      </div>
    </form>
  );
};

export default Search;