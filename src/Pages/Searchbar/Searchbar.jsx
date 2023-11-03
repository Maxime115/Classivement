import styles from "./Searchbar.module.scss";
import { useState } from 'react';

const Searchbar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (e) => {
    const text = e.target.value;
    setSearchText(text);
    onSearch(text);
  };

  return (
    <input
      className={styles.searchbar}
      type="text"
      placeholder="Rechercher un jeu"
      value={searchText}
      onInput={handleSearchChange}
    />
  );
};

export default Searchbar;