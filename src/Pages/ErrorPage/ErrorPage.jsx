import { Link } from "react-router-dom";
import styles from "./ErrorPage.module.scss"

function Error() {


  return (
    <>
    <div class={styles.error}>
    
     <h1 className={styles.erreur}>404</h1>
     <h2>La page que vous chercher n'existe pas</h2>
     <Link to="/"><button className="GrosEspacement">Retour a la page d'accueil</button></Link>
    </div>
    
    
    </>

    
  )
}

export default Error
