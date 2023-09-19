import { useState } from 'react';
import { Link } from "react-router-dom";
import styles from "./navbar.module.scss";
import Bouton from '../bouton/bouton.jsx';


function Navbar() {

  
  const [authentif, setAuthentif] = useState('Connexion');

  function handleClick() {
    
    setAuthentif(authentif === 'Connexion' ? 'Déconnexion' : 'Connexion');
  }

  return (
    <header>
      <a href="#" className={styles.logo}>
        CLASSIVEMENT
      </a>
      <nav>
        <a href="#">Accueil</a>
        <a href="#Apropos">A propos</a>
        <a href="#Jeux">Liste de jeux</a>
        <a href="#Achievement">Créer un achievement</a>
        <a href="#Contact">Contact</a>
      </nav>
      <button onClick={handleClick}>{authentif}</button>
    </header>
  );
}

export default Navbar;
