import { useState, useEffect } from 'react';
import styles from "./ListeJeux.module.scss"
import BoutonFilter from "../boutonFilter/boutonFilter.jsx"
import Searchbar from '../Searchbar/Searchbar';
import { Link } from 'react-router-dom';


const ListeJeux = () => {

  const [games, setGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [searchText, setSearchText] = useState('');
  const [filterOptions, setFilterOptions] = useState({ genre: 'all', plateforme: 'all' });
  const [sortOption, setSortOption] = useState('score_popularite');

  

  useEffect(() => {
    const getGames = async () => {
      try {
        const response = await fetch("http://localhost:8000/getGames");
        if (response.ok) {
          const jeuData = await response.json();
  
          // Apply search filter
          let filteredGames = jeuData;
          if (filterOptions.genre !== 'all') {
            filteredGames = filteredGames.filter((game) => game.genre === filterOptions.genre);
          }
    
          if (filterOptions.plateforme !== 'all') {
            filteredGames = filteredGames.filter((game) => game.plateforme === filterOptions.plateforme);
          }
    
          // Apply search filter
          if (searchText) {
            filteredGames = filteredGames.filter(
              (game) => game.nom_jeu.toLowerCase().includes(searchText.toLowerCase())
            );
          }
    
          // Apply sorting
          filteredGames.sort((a, b) => {
            if (sortOption === 'score_popularite') {
              // Sort in descending order for 'score_popularite'
              return b[sortOption] - a[sortOption];
            } else {
              // For other fields, keep the ascending order logic
              if (a[sortOption] < b[sortOption]) return -1;
              if (a[sortOption] > b[sortOption]) return 1;
              return 0;
            }
          });
  
          setGames(filteredGames);
        } else {
          console.log("Il y a eu une erreur");
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    getGames(); // Call the function inside useEffect
  }, [searchText, filterOptions, sortOption]);

  const handleFilterChange = (options) => {
    setFilterOptions((prevOptions) => ({ ...prevOptions, ...options }));
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const handleSearchChange = (text) => {
    setSearchText(text);
  };

  // Pagination function
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate index range for the current page
  const indexOfLastGame = currentPage * itemsPerPage;
  const indexOfFirstGame = indexOfLastGame - itemsPerPage;
  const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);

  
  return (
    <>
      <div className={styles.sectionListeJeux}>
        <h2 className={styles.titrePage}>Liste de jeux</h2>
        <Searchbar onSearch={handleSearchChange} />
        <BoutonFilter onFilterChange={handleFilterChange} onSortChange={handleSortChange} />

        <div className={styles.ListeJeux}>
          {currentGames.map((jeu) => (
           <Link to={`/jeuDetail/${jeu.jeu_id}`} key={jeu.jeu_id}>

            <figure key={jeu.jeu_id} className={`${styles.jaquetteContainer}`}>
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

        <div className={styles.paginateContainer}>
        <button
          className={`${styles.paginate} ${currentPage === 1 ? styles.disabled : ''}`}
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </button>

        {Array.from({ length: Math.ceil(games.length / itemsPerPage) }).map((_, index) => (
          <button
            key={index}
            className={`${styles.paginate} ${currentPage === index + 1 ? styles.active : ''}`}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          className={`${styles.paginate} ${currentPage === Math.ceil(games.length / itemsPerPage) ? styles.disabled : ''}`}
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(games.length / itemsPerPage)}
        >
          &gt;
        </button>
      </div>
      </div>
    </>
  );
};

export default ListeJeux;
 
