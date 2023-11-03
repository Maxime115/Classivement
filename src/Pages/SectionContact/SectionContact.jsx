import styles from "./SectionContact.module.scss";
import { Link } from "react-router-dom";

function section1 (texte) {

    return (
        <>
        <section className={styles.sectionNinja}>
            <div className="sectionHome">
               <h2>Prêt a défié la communauté ?</h2>
               <br></br>
               <p>Es-tu prêt a redécouvrir l'âge d'or du jeu vidéo ? Si oui, alors qu'attends tu pour la rejoindre la communauté <b>CLASSIVEMENT</b> en t'inscrivant sur notre site web ?
               <br></br>
               <br></br>
               Si tu fais déjà partie de notre communauté, ne t'attarde pas. Connecte-toi maintenant et continue d'écrire ton histoire parmi nous.
               </p>
               <br></br>
               <div>
               <Link to="/"><button className={styles.inscriptionConnexion}>S'inscrire</button></Link>
               <Link to="/"><button className={styles.inscriptionConnexion}>Se connecter</button></Link>
               </div>

            </div>
            
        </section>
        </>
    )
}

export default section1