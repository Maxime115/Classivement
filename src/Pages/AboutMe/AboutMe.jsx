import { Link } from "react-router-dom";
import styles from "./AboutMe.module.scss"
import Celebi from '../images/Achievements/Celebi.png';
import Inspiration from '../images/inspiration.png';
import React, { useState, useEffect } from "react";
import Zelda64 from '../images/jeux/Zelda64.webp';
import Goldeneye from '../images/jeux/GoldenEye007.jpg';
import PerfectDark from '../images/jeux/PerfectDark.png';


function AboutMe() {
  

  const imagesData = [
    { id: 1, alt: 'Zelda_OOT', nom: 'Zelda Ocarina of Time', annee: '1998', plateforme: 'N64', src: Zelda64, Popularite : 99},
    { id: 2, alt: 'Perfect_Dark', nom: 'Perfect Dark', annee: '2000', plateforme: 'N64', src: PerfectDark, Popularite : 97 },
    { id: 3, alt: 'Goldeneye', nom: 'GoldenEye 007', annee: '1997', plateforme: 'N64', src: Goldeneye, Popularite : 96},
    
];


const platformNames = {

  'N64': 'Nintendo 64',

};

const [filteredImages, setFilteredImages] = useState([]);

useEffect(() => {
  // Tri des jeux par ID
  const sortedImages = imagesData.sort((a, b) => a.id - b.id);
  setFilteredImages(sortedImages);
}, []);

  




  return (
    <>
    <div class={styles.sectionApropos}>
    <h2 className={styles.titrePage}>A propos de moi</h2>
    <div class={styles.AboutMe}>
    <p className={styles.presentation}>
        <h3>Qui-suis-je ?</h3>
        <br></br>
        Je m'appelle Maxime, j'ai 22 ans. Je suis passionné par l'informatique, les jeux vidéo et aussi par l'automobile.
        <br></br>
        <br></br>
        Peut-être que tu le sais déjà, toi la personne qui lit ce paragraphe de texte, mais en effet, je suis le développeur de <b>CLASSIVEMENT</b> que j'ai fait avec passion. 
        <br></br>
        <br></br>
        Si tu veux en savoir plus sur moi et ma vie professionnelle, je t'invite a te rendre sur <b><a href="https://maxime-leclercq.fr/">mon site portfolio</a></b>.
        Tu pourras y retrouver mes créations et mes projets web 
        <br></br>
        <br></br>
        <h3>Ma passion pour le jeu vidéo</h3>
        <br></br>
        C'est grâce à mon grand frère que j'ai découvert les jeux vidéo avec la Nintendo 64, ensuite il y a eu la Playstation 2, après quoi il y a eu la Xbox 360, puis il y a eu la Playstation 4.
        <br></br>
        <br></br>
        <h3>Qu'est ce que <b>CLASSIVEMENT</b> ?</h3>
        <br></br>
        Est-ce-que tu as déjà vu cette notification ? 
        <img src={Inspiration} className={styles.inspiration}/>
        <br></br>
        <br></br>
        Tu l'auras deviné, c'est une notification qu'on retrouve sur la Xbox pour te dire que comme quoi tu as fait une certaine action dans un jeu. 
        <br></br>   
        <br></br>     
        Et chaque jeu Xbox possède une liste de succès ou en anglais "Achievement"
        <br></br>
        <br></br>
        L'idée de CLASSIVEMENT ressemble étroitement à celle de la Xbox, à ceci près que, plutôt que de proposer une liste fixe de succès prédéfinis, c'est nous, en collaboration avec la communauté, qui élaborerons ensemble cette liste pour le jeu rétro de ton choix.
        <br></br>
        <br></br>

        <center><Link to="/Achievement"><button className={`${styles.create} ${styles.customButton}`}>Créer mon achievement</button></Link></center>
        </p>
        <img src={Celebi} className={`${styles.gif} ${styles.aura}`} />

    </div>
    <h2 className={styles.titrePage}>Mes 3 jeux rétro préféré </h2>
    <div className={styles.ListeJeux}>
        {filteredImages.map((img) => (
          <figure key={img.id} className={`${styles.jaquetteContainer}`}>
            <img className={`${styles.jaquette} ${styles.imageCommonStyles}`} src={img.src} alt={img.alt} />
            <figcaption className={styles.jaquetteCaption}>
              <h2>{img.nom}</h2>
              <br></br>
              <h3>{platformNames[img.plateforme]}</h3>
              <br></br>
              <h3>{img.annee}</h3>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
    
    
    </>

    
  )
}

export default AboutMe
