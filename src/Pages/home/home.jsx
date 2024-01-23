import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Link } from "react-router-dom";
import Section1 from '../section1/section1.jsx';
import styles from "./home.module.scss"
import Galerie from "../gallerieHome/gallerieHome.jsx"
import LastAchievement from "../lastAchievement/lastAchievement.jsx"
import SectionContact from '../SectionContact/SectionContact.jsx';
import { UserContext } from "../../Layout/Layout.jsx";



function Home() {

  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);

  const handleLogout = () => {
    fetch ("http://localhost:8000/logout", {
      method: 'POST',
      credentials: 'include', // Include cookies
    })
    .then((response) => {
      if (response.ok) {
        setIsLoggedIn(false); // If logout was successful, update the login status in your React app
      } else {
        console.error('Logout failed');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }




  return (
    <>
    <div class={styles.home}>
      
     <Section1/>
    <div className={styles.sectionHome}>
    <Galerie/>
    <Link to="ListeJeux"><button className="GrosEspacement">Voir la liste</button></Link>
    <h2 className="espacement">Achievements les plus récents</h2>
    <LastAchievement/>
    </div>
    {!isLoggedIn && <SectionContact/>}
    </div>
    
    
    </>

    
  )
}

export default Home
