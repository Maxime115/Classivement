import styles from "./bouton.module.scss";

function boutonListe (texte) {

    return (
        <>
        <button>
            onClick={() => setIsExpanded(true)}
            {texte.children}
            </button>
            {isExpanded &&
            <div className={styles.sousMenu}>
                <ul>
                {options.map(option => (
                    <li key={option}>{option}</li>
                ))}
                </ul>
            </div>
            }
        </>
    )
}

export default boutonListe;