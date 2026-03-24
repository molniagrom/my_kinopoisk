import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import SearchForm from '../SearchForm/SearchForm.tsx';
import s from './header.module.css';

type HeaderSearchBarProps = {
  value: string;
  suggestions: string[];
  onChange: (value: string) => void;
  onSubmit: () => void;
  onClear: () => void;
  onClose: () => void;
};

export const HeaderSearchBar = ({
  value,
  suggestions,
  onChange,
  onSubmit,
  onClear,
  onClose,
}: HeaderSearchBarProps) => {
  return (
    <Box className={s.searchRowOpen}>
      <Box className={s.searchDebugLabel}>SEARCH OPEN</Box>
      <div className={s.searchFormWrap}>
        <SearchForm
          value={value}
          onChange={onChange}
          onSubmit={onSubmit}
          onClear={onClear}
          placeholder="Search movies..."
          buttonLabel="Go"
          suggestions={suggestions}
        />
      </div>
      <IconButton aria-label="close search" onClick={onClose} size="small">
        <CloseIcon />
      </IconButton>
    </Box>
  );
};

export default HeaderSearchBar;
