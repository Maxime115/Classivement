import styles from "./bouton.module.scss";

function bouton (texte) {

    return (
        <>
        <button>{texte.children}</button>
        </>
    )
}

export default bouton