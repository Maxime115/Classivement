import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from "./Register.module.scss";
import { useForm } from 'react-hook-form';
// import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';

export default function Contact() {
  

  return (
    <>
      <h2 className={styles.titrePage}>Contact</h2>

      

      <div className={styles.formulaire}>
        <form>

        <label htmlFor="name">Nom*</label>
          <input type="text" id="name" placeholder="Nom*" />

          <label htmlFor="email">Adresse E-mail*</label>
          <input type="text" id="email" placeholder="Adresse E-mail*" />
          {/* {errors?.email && (
            <p className={styles.texterror}>{errors.email.message}</p>
          )} */}

          <label htmlFor="message">Ton message*</label>
          <textarea 
            id="message" 
            name="message" 
            placeholder="Ton message*" 
            className={styles.messageTextarea} 
            rows="5">
          </textarea>
          {/* {errors?.password && (
            <p className={styles.texterror}>{errors.password.message}</p>
          )} */}

          <button className={styles.submit}>Envoyer</button>
          {/* {feedback && <p className={styles.textgood}>{feedback}</p>} */}
        </form>
        <br></br>
      
      </div>
    </>
  );
}