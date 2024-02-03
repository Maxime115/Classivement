import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from "./lastAchievement.module.scss"



function LastAchievement() {

  const [achievementList, setAchievementList] = useState([{Nom_Achievement : ""}])

  useEffect(() => {
    async function getAchievement() {
      try {
        const response = await fetch("http://localhost:8000/getAchievement");
        if (response.ok) {
          const achievements = await response.json();

          // Fetch game information for each achievement
          const achievementsWithGames = await Promise.all(
            achievements.map(async (achievement) => {
              const gameResponse = await fetch(`http://localhost:8000/getGames/${achievement.jeu_id}`);
              if (gameResponse.ok) {
                const game = await gameResponse.json();
                return { ...achievement, gameName: game.nom_jeu };
              } else {
                console.log(`Failed to fetch game for achievement with jeu_id ${achievement.jeu_id}`);
                return achievement;
              }
            })
          );

          // Sort and slice as before
          const latestThreeAchievements = achievementsWithGames.sort((a, b) => b.id_Achievement - a.id_Achievement).slice(0, 3);
          console.log(latestThreeAchievements);
          setAchievementList(latestThreeAchievements);
        } else {
          console.log("Il y a eu une erreur");
        }
      } catch (error) {
        console.log(error);
      }
    }
    getAchievement();
  }, []);



    return (
      <div className='TresGrosEspacement'>
        <div className={styles.achievementContainer}>
          {achievementList.map((achievements) => (
            <div key={achievements.id_Achievement} className={styles.achievement}>
              <div>
                <img className={styles.icone} src={`http://localhost:8000/${achievements.icon}`}  alt= {achievements.title} />
                <h4>Jeu : {achievements.game_name}</h4>
              </div>
              <div className={styles.info}>
                <h3 className={styles.titre}>{achievements.title}</h3>
                <br></br>
                <p>{achievements.description}</p>
              </div>
              <Link to={`/achievementDetail/${achievements.id_Achievement}`}><button className={styles.enSavoir}>En savoir +</button></Link>
            </div>
          ))}
        </div>
        </div>
      );
    }
  
  export default LastAchievement;