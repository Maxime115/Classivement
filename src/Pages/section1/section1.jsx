import styles from "./section1.module.scss";
import Logo from '../images/Logo.png';

function section1 (texte) {

    return (
        <>
        <section className={styles.sectionNinja}>
            <h1>BIENVENUE SUR </h1>
            <img src={Logo} className={styles.logo}/>
        </section>
        </>
    )
}

export default section1