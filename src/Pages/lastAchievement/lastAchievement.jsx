import { useState, useEffect } from 'react';
import styles from "./lastAchievement.module.scss"



function LastAchievement() {

  const [achievementList, setachievementList] = useState([{Nom_Achievement : ""}])

  useEffect( () => {
    async function getAchievement(){
        try{
            const response = await fetch("http://localhost:8000/getAchievement");
            if (response.ok){
                const achievements = await response.json();
                achievements.sort((a, b) => b.id_Achievement - a.id_Achievement);
                const latestThreeAchievements = achievements.slice(0, 3);
                console.log(latestThreeAchievements);
                setachievementList(latestThreeAchievements)
            } else{
                console.log("Il y a eu une erreur");
            }
        } 
        catch (error){
            console.log(error);
        }
    }
    getAchievement();
}, [])


    return (
      <div className='TresGrosEspacement'>
        <div className={styles.achievementContainer}>
          {achievementList.map((achievements) => (
            <div key={achievements.id_Achievement} className={styles.achievement}>
              <div>
                <img className={styles.icone} src={`http://localhost:8000/${achievements.icon}`}  alt= {achievements.title} />
                <h4>Jeu :  {achievements.game}</h4>
              </div>
              <div className={styles.info}>
                <h3 className={styles.titre}>{achievements.title}</h3>
                <br></br>
                <p>{achievements.description}</p>
              </div>
              <button className={styles.enSavoir}>En savoir +</button>
            </div>
          ))}
        </div>
        </div>
      );
    }
  
  export default LastAchievement;