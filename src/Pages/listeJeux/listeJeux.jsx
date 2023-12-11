import { useState, useEffect } from 'react';
import styles from "./ListeJeux.module.scss"
import BoutonFilter from "../boutonFilter/boutonFilter.jsx"
import Searchbar from '../Searchbar/Searchbar';
import Zelda64 from '../images/jeux/Zelda64.webp';
import Goldeneye from '../images/jeux/GoldenEye007.jpg';
import NinjaGaiden from '../images/jeux/NinjaGaiden.jpg';
import Pokemon from '../images/jeux/PokemonCristal.jpg';
import Tekken3 from '../images/jeux/Tekken3.jpg';
import GuiltyGear from '../images/jeux/GuiltyGear.jpg';
import GranTurismo from '../images/jeux/GranTurismo.jpg';
import SF2 from '../images/jeux/SF2.jpg';
import Mario from '../images/jeux/Mario.webp';
import GTA2 from '../images/jeux/GTA2.jpg';




const imagesData = [
    { id: 1, alt: 'Zelda_OOT', nom: 'Zelda Ocarina of Time', annee: '1998', plateforme: 'N64', genre: 'Action-RPG', src: Zelda64, Popularite : 99},
    { id: 2, alt: 'Goldeneye', nom: 'GoldenEye 007', annee: '1997', plateforme: 'N64', genre: 'FPS', src: Goldeneye, Popularite : 96},
    { id: 3, alt: 'Ninja_Gaiden', nom: 'Ninja Gaiden', annee: '1991', plateforme: 'NES', genre: 'Plateforme', src: NinjaGaiden, Popularite : 80 },
    { id: 4, alt: 'Pokemon_Cristal', nom: 'Pokémon Cristal', annee: '2001', plateforme: 'GB', genre: 'RPG', src: Pokemon, Popularite : 87 },
    { id: 5, alt: 'Tekken_3', nom: 'Tekken 3', annee: '1998', plateforme: 'PS1', genre: 'FG', src: Tekken3, Popularite : 96 },
    { id: 6, alt: 'Guilty_Gear', nom: 'Guilty Gear', annee: '1998', plateforme: 'PS1', genre: 'FG', src: GuiltyGear, Popularite : 75 },
    { id: 7, alt: 'Gran_Turismo', nom: 'Gran Turismo', annee: '1998', plateforme: 'PS1', genre: 'Racing', src: GranTurismo, Popularite : 96 },
    { id: 8, alt: 'Street_Fighter2', nom: 'Street Fighter 2', annee: '1992', plateforme: 'SNES', genre: 'FG', src: SF2, Popularite : 85  },
    { id: 9, alt: 'Super Mario Bros', nom: 'Super Mario Bros', annee: '1985', plateforme: 'NES', genre: 'Plateforme', src: Mario, Popularite : 84 },
    { id: 10, alt: 'GTA2', nom: 'Grand Theft Auto 2', annee: '1999', plateforme: 'PS1', genre: 'Action-RPG', src: GTA2, Popularite : 70 },
  
    
];

const plateforme = {
  'NES': 'NES',
  'SNES': 'SNES',
  'GB': 'GameBoy',
  'N64': 'Nintendo 64',
  'PS1': 'Playstation',
};

const ListeJeux = () => {
    
  const imagesPage = 6;
  const [filter, setFilter] = useState('all');
  const [genreFilter, setGenreFilter] = useState('all');
  const [filteredImages, setFilteredImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [searchText, setSearchText] = useState('');
  const [sortType, setSortType] = useState('popularite');

  const handleSortChange = (newSortType) => {
    setSortType(newSortType);
  };
  


  const handleSearchChange = (text) => {
    setSearchText(text);
  };
  

  const changeFilter = (newFilter) => {
    setCurrentPage(1);
    if (newFilter.hasOwnProperty('plateforme')) {
      setFilter(newFilter.plateforme);
    } else if (newFilter.hasOwnProperty('genre')) {
      setGenreFilter(newFilter.genre);
    }
  };

  useEffect(() => {
    let imagesFiltered = [...imagesData];

    if (filter !== 'all' || genreFilter !== 'all') {
      imagesFiltered = imagesData.filter(
        (image) =>
          (filter === 'all' || image.plateforme === filter) &&
          (genreFilter === 'all' || image.genre === genreFilter)
      );
    }

    if (searchText) {
      imagesFiltered = imagesFiltered.filter(
        (image) =>
          image.nom.toLowerCase().includes(searchText.toLowerCase()) ||
          image.plateforme.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Appliquer le tri selon le sortType
    if (sortType === 'popularite') {
      imagesFiltered.sort((a, b) => b.Popularite - a.Popularite);
    } else if (sortType === 'alphabetique') {
      imagesFiltered.sort((a, b) => a.nom.localeCompare(b.nom));
    } else if (sortType === 'annee') {
      imagesFiltered.sort((a, b) => parseInt(a.annee) - parseInt(b.annee));
    }

    setFilteredImages(imagesFiltered);
  }, [filter, genreFilter, searchText, sortType]);

  const indexLastImage = currentPage * imagesPage;
  const indexFirstImage = indexLastImage - imagesPage;
  const currentImages = filteredImages.slice(indexFirstImage, indexLastImage);

  const changeSort = (newSortType) => {
    setSortType(newSortType);
  };
  

  // Pagination function
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };
  
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredImages.length / imagesPage)) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };


        
  return (
    <>
    <div className={styles.sectionListeJeux}>
    <h2 className={styles.titrePage}>Liste de jeux</h2>
      <Searchbar onSearch={handleSearchChange} />
      
      <BoutonFilter onFilterChange={changeFilter} onSortChange={handleSortChange}/>
      
      <div className={styles.ListeJeux}>
        {currentImages.map((img) => (
          <figure key={img.id} className={`${styles.jaquetteContainer}`}>
            <img className={`${styles.jaquette} ${styles.imageCommonStyles}`} src={img.src} alt={img.alt} />
            <figcaption className={styles.jaquetteCaption}>
              <h2>{img.nom}</h2>
              <br></br>
              <h3>{plateforme[img.plateforme]}</h3>
              <br></br>
              <h3>{img.annee}</h3>
            </figcaption>
          </figure>
        ))}
      </div>

      <div>
  <button className={styles.paginate} onClick={prevPage} disabled={currentPage === 1} aria-label="Previous Page">
    &lt;
  </button>
  {[
    ...Array(Math.ceil(filteredImages.length / imagesPage)),
  ].map((_, i) => (
    <button
  className={`${styles.paginate} ${currentPage === i + 1 ? styles.active : ''}`}
  key={i + 1}
  onClick={() => paginate(i + 1)}
  aria-current={currentPage === i + 1 ? 'page' : undefined}
>
  {i + 1}
</button>
  ))}
  <button className={styles.paginate} onClick={nextPage} disabled={currentPage === Math.ceil(filteredImages.length / imagesPage)} aria-label="Next Page">
    &gt;
  </button>
</div>
      </div>
    </>
  );
};

export default ListeJeux;
 
