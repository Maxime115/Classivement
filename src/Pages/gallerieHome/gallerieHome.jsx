import { useState, useEffect } from 'react';
import styles from "./gallerieHome.module.scss"
import { Link } from 'react-router-dom';

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

const GallerieHome = () => {
  const [games, setGames] = useState([]);
  const [filterOptions, setFilterOptions] = useState({ plateforme: 'all' });

  const handleFilterChange = (e, filterType) => {
    const selectedValue = e.target.value;
    setFilterOptions({ ...filterOptions, [filterType]: selectedValue });
  };

  useEffect(() => {
    const getGames = async () => {
      try {
        const response = await fetch("http://localhost:8000/getGames");
        if (response.ok) {
          const jeuData = await response.json();
  
          // Apply platform filter
          let filteredGames = jeuData;
          if (filterOptions.plateforme !== 'all') {
            filteredGames = filteredGames.filter((game) => game.plateforme === filterOptions.plateforme);
          }
  
          // Sort games by popularity and take the top 6
          const sortedGames = filteredGames.sort((a, b) => b.score_popularite - a.score_popularite).slice(0, 6);
  
          setGames(sortedGames);
        } else {
          console.log("Il y a eu une erreur");
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    getGames(); // Call the function inside useEffect
  }, [filterOptions]);

  return (
    <div>
      <h2 className="espacement">Les jeux les plus populaires</h2>
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
      <div className={styles.ListeJeux}>
        {games.map((jeu) => (
          <Link to={`/jeuDetail/${jeu.jeu_id}`} key={jeu.jeu_id}>
            <figure className={`${styles.jaquetteContainer}`}>
              <img
                className={`${styles.jaquette} ${styles.imageCommonStyles}`}
                src={`http://localhost:8000/${jeu.couverture}`}
                alt={jeu.nom_jeu}
              />
              <figcaption className={styles.jaquetteCaption}>
                <h2>{jeu.nom_jeu}</h2>
                <br />
                <h3>{jeu.plateforme}</h3>
                <br />
                <h3>{jeu.annee_sortie}</h3>
                <div className={styles.additionalInfo}>
                  <h4>{jeu.developpeur}</h4>
                  <h4>Score : {jeu.score_popularite}</h4>
                </div>
              </figcaption>
            </figure>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GallerieHome;
