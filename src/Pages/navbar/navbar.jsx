import { Link } from "react-router-dom";
import styles from "./navbar.module.scss"
import Bouton from '../bouton/bouton.jsx';



function navbar () {

    return (
        <>
        <header>
        <a href="#" className={styles.logo}>CLASSIVEMENT</a>
         <nav>
        <a href="#">Accueil</a>
        <a href="#Apropos">A propos</a>
        <a href="#Jeux">Liste de jeux</a>
        <a href="#Achievement">Créer un achievement</a>
        <a href="#Contact">Contact</a>
		</nav>
        <a href="#Seconnecter"><Bouton>Se connecter</Bouton></a>
        </header>
        </>
    )
}

export default navbar