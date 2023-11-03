import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Section1 from '../section1/section1.jsx';
import styles from "./home.module.scss"
import Formulaire from "../Formulaire/formulaire.jsx"
import Galerie from "../gallerieHome/gallerieHome.jsx"
import LastAchievement from "../lastAchievement/lastAchievement.jsx"
import SectionContact from '../SectionContact/SectionContact.jsx';



function Home() {


  return (
    <>
    <div class={styles.home}>
    
     <Section1/>
    <div className={styles.sectionHome}>
    <Galerie/>
    <Link to="ListeJeux2"><button className="GrosEspacement">Voir la liste</button></Link>
    <h2 className="espacement">Achievements les plus récents</h2>
    <LastAchievement/>
    </div>
    <SectionContact/>
    </div>
    
    
    </>

    
  )
}

export default Home
