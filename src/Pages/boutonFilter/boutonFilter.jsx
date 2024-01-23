import styles from "./boutonFilter.module.scss";


function boutonFilter({ onFilterChange, onSortChange }) {
  const sortTypes = [
    { value: 'score_popularite', label: 'Popularité' },
    { value: 'annee_sortie', label: 'Année de sortie' },
    { value: 'nom_jeu', label: 'Alphabétique' },
  ];

    const plateformeOptions = [
    { value: 'all', label: 'Toutes les plateformes' },
    { value: 'Master System', label: 'Master System' },
    { value: 'NES', label: 'NES' },
    { value: 'Gameboy', label: 'Gameboy' },
    { value: 'Gameboy Color', label: 'Gameboy Color' },
    { value: 'Mega Drive', label: 'Mega Drive' },
    { value: 'Super NES', label: 'Super NES' },
    { value: 'Neogeo', label: 'Neogeo' },
    { value: 'Saturn', label: 'Saturn' },
    { value: 'Nintendo 64', label: 'Nintendo 64' },
    { value: 'Playstation', label: 'Playstation' },
    { value: 'PC', label: 'PC' }
  ];

  const genreOptions = [
    { value: 'all', label: 'Tous les genres' },
    { value: 'Jeux de combat', label: 'Jeux de combat' },
    { value: "Beat'em all", label: "Beat'em all" },
    { value: 'Jeux de plate-forme', label: 'Jeux de plate-forme' },
    { value: 'FPS', label: 'FPS' },
    { value: "Shoot'em up", label: "Shoot'em up" },
    { value: 'Rail Shooters', label: 'Rail Shooters' },
    { value: 'Action-RPG', label: 'Action-RPG' },
    { value: 'RPG', label: 'RPG' },
    { value: 'Puzzle game', label: 'Puzzle game' },
    { value: 'Simulation', label: 'Simulation' },
    { value: 'Stratégie', label: 'Stratégie' },
    { value: 'Jeux de sport', label: 'Jeux de sport' },
    { value: 'Jeux de courses', label: 'Jeux de courses' },
  ];

  const handleSortChange = (e) => {
    onSortChange(e.target.value);
  };


  const handleFilterChange = (e, filterType) => {
    const selectedValue = e.target.value;
    onFilterChange({ [filterType]: selectedValue });
  };


  return (
    <>
      <div className={styles.filterContainer}>
        <select
          className={styles.filterSelect}
          onChange={(e) => handleFilterChange(e, 'genre')}
        >
          {genreOptions.map(({ value, label }, index) => (
            <option key={index} value={value}>
              {label || value}
            </option>
          ))}
        </select>

        <select
          className={styles.filterSelect}
          onChange={(e) => handleFilterChange(e, 'plateforme')}
        >
          {plateformeOptions.map(({ value, label }, index) => (
            <option key={index} value={value}>
              {label || value}
            </option>
          ))}
        </select>

        <select className={styles.filterSelect} onChange={handleSortChange}>
          {sortTypes.map(({ value, label }, index) => (
            <option key={index} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default boutonFilter;