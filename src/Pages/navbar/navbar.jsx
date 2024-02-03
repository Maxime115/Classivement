
import { useContext } from 'react';
import { Link } from "react-router-dom";
import styles from "./navbar.module.scss";
import Bouton from '../bouton/bouton.jsx';
import Items from "../items/items.jsx";
import Logo from '../images/Logo.png';
import { UserContext } from "../../Layout/Layout.jsx";


function Navbar() {
  
  const { isLoggedIn, setIsLoggedIn, username, id, admin } = useContext(UserContext);


  console.log(username);
  console.log(id);
  console.log(isLoggedIn);
  console.log(admin);

  const isAdmin = admin === "1";

  console.log(isAdmin);


  


  

  const handleLogout = () => {
    fetch ("http://localhost:8000/logout", {
      method: 'POST',
      credentials: 'include', 
    })
    .then((response) => {
      if (response.ok) {
        setIsLoggedIn(false); 
      } else {
        console.error('Logout failed');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
  
  return (
    <header>
      
        <Link to="/" className= {styles.logo}><img src={Logo} className={styles.logo}/></Link>
      
      <nav>
       <Link to="/">Accueil</Link>
       <Link to="/Apropos">A propos</Link>
       <Link to="ListeJeux">Liste de jeux</Link>
       <Link to="/Contact">Contact</Link>
       {isLoggedIn && (
          <>
            <Link to={`/Achievement/${id}`}>Créer un achievement</Link>

            <Link to={`/profile/${id}`}>Profil</Link>
            {isLoggedIn && isAdmin && (
        <Link to="/adminDashboard">Dashboard Admin</Link>
      )}
          </>
        )}
      </nav>
      {!isLoggedIn ? (
        <>
          <Link to="Register">
            <button role="button" aria-label="Register">Inscription</button>
          </Link>
          <Link to="Login">
            <button role="button" aria-label="Login">Connexion</button>
          </Link>
        </>
      ) : (
        <button onClick={handleLogout} role="button" aria-label="Logout">Déconnexion</button>
      )}
    </header>
  );
}

export default Navbar;
