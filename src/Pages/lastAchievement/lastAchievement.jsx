import { useState, useEffect } from 'react';
import styles from "./lastAchievement.module.scss"
import Celebi from '../images/Achievements/Celebi.png';
import Baiken from '../images/Achievements/Baiken.png';
import Boris from '../images/Achievements/Boris.png';

const Achievements = [
    { id: 1, 
    alt: 'Celebi_Shiny', 
    nom: 'On ne fuit pas son destin',
    description: "Capturer un Celebi chromatique. 1/8192 d'en croiser un lors de la rencontre de Celebi",
    jeu: 'Pokémon Cristal', 
    src: Celebi
    },

    { id: 2, 
        alt: 'Baiken', 
        nom: 'Mirror of the world',
        description: "Terminer le mode Arcade avec Sol Badguy ou Ky Kiske sans utiliser de Continue et vaincre Baiken",
        jeu: 'Guilty Gear', 
        src: Baiken
    },

    { id: 3, 
        alt: 'Invincible', 
        nom: 'Je suis INVINCIBLE',
        description: "Terminer Facility en 2 minutes et 5 secondes en 00 Agent",
        jeu: 'GoldenEye 007', 
        src: Boris
    }

];


function LastAchievement() {

    const reversedAchievements = [...Achievements].reverse();

    const lastThreeAchievements = reversedAchievements.slice(0, 3);

    return (
      <div className='TresGrosEspacement'>
        <div className={styles.achievementContainer}>
          {lastThreeAchievements.map((achievement) => (
            <div key={achievement.id} className={styles.achievement}>
              <div>
                <img className={styles.icone} src={achievement.src} alt={achievement.alt} />
                <h4>Jeu :  {achievement.jeu}</h4>
              </div>
              <div className={styles.info}>
                <h3 className={styles.titre}>{achievement.nom}</h3>
                <br></br>
                <p>{achievement.description}</p>
              </div>
              <button className={styles.enSavoir}>En savoir +</button>
            </div>
          ))}
        </div>
        </div>
      );
    }
  
  export default LastAchievement;