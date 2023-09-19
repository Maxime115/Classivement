import styles from "./textbox.module.scss";

import { useState } from 'react';



function textbox ({ type /*...*/ }) {

    const [texte, setTexte]= useState('');

    const changement = (event) => {
        setTexte(event.target.value);
    }

    return (
        <>
        <br></br>
    <br></br>
         <h1><label htmlFor="textbox">Texte :</label></h1>
        <input 
        type="text"
        id={styles.textbox}
        value={texte}
        onChange={changement}
        />
        <br></br>
    <br></br>
        <h1>Texte saisi : {texte}</h1>
        </>
    )
}

export default textbox


