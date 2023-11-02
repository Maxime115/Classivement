import { useState, useEffect } from 'react';
import styles from "./ListeJeux.module.scss"
import BoutonFilter from "../boutonFilter/boutonFilter.jsx"
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
    { id: 1, alt: 'Zelda_OOT', nom: 'Zelda Ocarina of Time', annee: '1998', plateforme: 'N64', src: Zelda64, Popularite : 99},
    { id: 2, alt: 'Goldeneye', nom: 'GoldenEye 007', annee: '1997', plateforme: 'N64', src: Goldeneye, Popularite : 96},
    { id: 3, alt: 'Ninja_Gaiden', nom: 'Ninja Gaiden', annee: '1991', plateforme: 'NES', src: NinjaGaiden, Popularite : 80 },
    { id: 4, alt: 'Pokemon_Cristal', nom: 'Pokémon Cristal', annee: '2001', plateforme: 'GB', src: Pokemon, Popularite : 87 },
    { id: 5, alt: 'Tekken_3', nom: 'Tekken 3', annee: '1998', plateforme: 'PS1', src: Tekken3, Popularite : 96 },
    { id: 6, alt: 'Guilty_Gear', nom: 'Guilty Gear', annee: '1998', plateforme: 'PS1', src: GuiltyGear, Popularite : 75 },
    { id: 7, alt: 'Gran_Turismo', nom: 'Gran Turismo', annee: '1998', plateforme: 'PS1', src: GranTurismo, Popularite : 96 },
    { id: 8, alt: 'Street_Fighter2', nom: 'Street Fighter 2', annee: '1992', plateforme: 'SNES', src: SF2, Popularite : 85  },
    { id: 9, alt: 'Super Mario Bros', nom: 'Super Mario Bros', annee: '1985', plateforme: 'NES', src: Mario, Popularite : 84 },
    { id: 10, alt: 'GTA2', nom: 'Grand Theft Auto 2', annee: '1999', plateforme: 'PS1', src: GTA2, Popularite : 70 }
];

const ListeJeux = () => {
    
  const imagesPage = 6;
  const [filter, setFilter] = useState('all');
  const [filteredImages, setFilteredImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  

  const changeFilter = (newFilter) => {
    setCurrentPage(1); // Reset current page when applying new filter
    setFilter(newFilter);
  };

  useEffect(() => {
    let imagesFiltered; 

    if (filter === 'all') {
        imagesFiltered = [...imagesData]; 
    } else {
        imagesFiltered = imagesData.filter((image) => image.plateforme === filter);
    }

     imagesFiltered.sort((a, b) => b.Popularite - a.Popularite);
   
    setFilteredImages(imagesFiltered);

  }, [filter]);

  const indexLastImage = currentPage * imagesPage;
  const indexFirstImage = indexLastImage - imagesPage;
  const currentImages = filteredImages.slice(indexFirstImage, indexLastImage);
  

  // Pagination function
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
        
  return (
    <>
    <div>
      <BoutonFilter onFilterChange={changeFilter}/>
      <div className={styles.ListeJeux}>
        {currentImages.map((img) => (
          <figure key={img.id} className={`${styles.jaquetteContainer}`}>
            <img className={`${styles.jaquette} ${styles.imageCommonStyles}`} src={img.src} alt={img.alt} />
            <figcaption className={styles.jaquetteCaption}>
              <h2>{img.nom}</h2>
              <h3>{img.plateforme}</h3>
              <h3>{img.annee}</h3>
            </figcaption>
          </figure>
        ))}
      </div>

      <div>
        {[
          ...Array(
            Math.ceil(filteredImages.length / imagesPage)
          ),
        ].map((_, i) => (
          <button className={styles.paginate} key={i + 1} onClick={() => paginate(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>
      </div>
    </>
  );
};

export default ListeJeux;
 
