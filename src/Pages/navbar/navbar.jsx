import { useState } from 'react';
import { Link } from "react-router-dom";
import styles from "./navbar.module.scss";
import Bouton from '../bouton/bouton.jsx';
import Items from "../items/items.jsx";


function Navbar() {
  
  
  const [authentif, setAuthentif] = useState('Connexion');

  function handleClick() {
    
    setAuthentif(authentif === 'Connexion' ? 'Déconnexion' : 'Connexion');
  }

  return (
    <header>
      
        <Link to="/" className= {styles.logo}>CLASSIVEMENT</Link>
      
      <nav>
       <Link to="/">Accueil</Link>
       <Link to="/">A propos</Link>
       <Link to="ListeJeux">Liste de jeux</Link>
       <Link to="/">Créer un achievement</Link>
       <Link to="/">Contact</Link>
      </nav>
      <button onClick={handleClick}>{authentif}</button>
    </header>
  );
}

export default Navbar;
