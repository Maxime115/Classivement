
import { Link } from "react-router-dom";
import styles from "./Footer.module.scss";
import Items from "../items/items.jsx";


function Footer() {
  

  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        {/* Sitemap à gauche */}
        <ul>
          <li>
            <Link to="/">Accueil</Link>
          </li>
          <li>
            <Link to="/">À propos</Link>
          </li>
          <li>
            <Link to="/ListeJeux">Liste de jeux</Link>
          </li>
          <li>
            <Link to="/">Créer un achievement</Link>
          </li>
          <li>
            <Link to="/">Contact</Link>
          </li>
          <li>
            <Link to="/">Mentions légales</Link>
          </li>
          <li>
            <Link to="/">Politique de confidentialité</Link>
          </li>
        </ul>
      </div>
      <div className={styles.center}>
        {/* Partie Copyright au centre */}
        <p>&copy; {new Date().getFullYear()} CLASSIVEMENT | Tout droit réservé</p>
      </div>
      <div className={styles.right}>
        {/* Icônes YouTube et Discord à droite */}
        <Link to="https://www.youtube.com"><i className="fa-brands fa-youtube fa-3x"></i></Link>
        <Link to="https://discord.gg/dS2BWa3x"><i className="fa-brands fa-discord fa-3x"></i></Link>
      </div>
    </footer>
  );
}

export default Footer;
