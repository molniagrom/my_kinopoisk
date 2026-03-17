import React from 'react';

import s from './SearchForm.module.css';

type SearchFormProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onClear?: () => void;
  placeholder?: string;
  buttonLabel?: string;
  suggestions?: string[];
};

export const SearchForm = ({
  value,
  onChange,
  onSubmit,
  onClear,
  placeholder = 'Enter a movie title',
  buttonLabel = 'Search',
  suggestions = [],
}: SearchFormProps) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value;
    onChange(nextValue);
    if (nextValue.trim() === '' && onClear) {
      onClear();
    }
  };

  const showSuggestions = isFocused && value.trim() !== '' && suggestions.length > 0;

  return (
    <form role="search" className={s.form} onSubmit={handleSubmit}>
      <div className={s.inputWrap}>
        <input
          type="search"
          value={value}
          onChange={handleChange}
          className={s.input}
          placeholder={placeholder}
          aria-label="Movie search"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {showSuggestions ? (
          <div className={s.suggestions} role="listbox">
            {suggestions.map((title) => (
              <button
                key={title}
                type="button"
                className={s.suggestionItem}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => onChange(title)}
              >
                {title}
              </button>
            ))}
          </div>
        ) : null}
      </div>
      <button type="submit" className={s.button}>
        {buttonLabel}
      </button>
    </form>
  );
};

export default SearchForm;
