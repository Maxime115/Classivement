import styles from "./boutonFilter.module.scss";


function boutonFilter ({ onFilterChange, onSortChange }) {

  const sortTypes = [
    {value: 'popularite', label: 'Popularité'},
    {value: 'alphabetique', label: 'Alphabétique'},
    {value: 'annee', label: 'Année'}
  ];

    const plateforme = [{value: 'all', label: 'Toutes les plateformes'}, 
    {value: 'NES', label: 'NES'},
    {value: 'SNES', label: 'SNES'},
    {value: 'GB', label: 'Gameboy'},
    {value: 'N64', label: 'Nintendo 64'},
    {value: 'PS1', label: 'Playstation'}, 
  ];

  const genre = [
    { value: 'all', label: 'Tous les genres' },
    { value: 'Action-RPG', label: 'Action-Aventure' },
    { value: 'FPS', label: 'FPS' },
    { value: 'Plateforme', label: 'Jeux de plateforme' },
    { value: 'RPG', label: 'RPG' },
    { value: 'FG', label: 'Jeux de combats' },
    { value: 'Racing', label: 'Jeux de course' }
  ];

  const handleSortChange = (e) => {
    onSortChange(e.target.value);
  };


  const handleFilterChange = (e, filterType) => {
    const selectedValue = e.target.value;

    // Determine which type of filter has been changed
    if (filterType === 'plateforme') {
      onFilterChange({ plateforme: selectedValue });
    } else if (filterType === 'genre') {
      onFilterChange({ genre: selectedValue });
    }
  };


  return (

      <>
       <div className={styles.filterContainer}>

      <select className={styles.filterSelect} 
      onChange={(e) => handleFilterChange(e, 'genre')}>
        {genre.map(({ value, label }, index) => (
          <option key={index} value={value}>
            {label || value}
          </option>
        ))}
      </select>

      <select className={styles.filterSelect} 
      onChange={(e) => handleFilterChange(e, 'plateforme')}>
        {plateforme.map(({ value, label }, index) => (
          <option key={index} value={value}>
            {label || value}
          </option>
        ))}
      </select>

      <select className={styles.filterSelect} 
      onChange={handleSortChange}>
        {sortTypes.map(({value, label}, index) => (
          <option key={index} value={value}>
            {label}
          </option>
        ))}
      </select>

      </div>
    </>
  );
}
export default boutonFilter