import { useState } from 'react';
import { Link } from "react-router-dom";
import styles from "./navbar.module.scss";
import Bouton from '../bouton/bouton.jsx';
import Items from "../items/items.jsx";
import Logo from '../images/Logo.png';


function Navbar() {
  
  
  const [authentif, setAuthentif] = useState('Connexion');

  function handleClick() {
    
    setAuthentif(authentif === 'Connexion' ? 'Déconnexion' : 'Connexion');
  }

  return (
    <header>
      
        <Link to="/" className= {styles.logo}><img src={Logo} className={styles.logo}/></Link>
      
      <nav>
       <Link to="/">Accueil</Link>
       <Link to="/Apropos">A propos</Link>
       <Link to="ListeJeux">Liste de jeux</Link>
       <Link to="/Achievement">Créer un achievement</Link>
       <Link to="/Contact">Contact</Link>
      </nav>
      <Link to="Register"><button>Inscription</button></Link>
      <Link to="Login"><button>Connexion</button></Link>
    </header>
  );
}

export default Navbar;
