import styles from "./jeuDetail.module.scss"
import { useContext, useState, useEffect } from'react';
import { useParams } from 'react-router-dom';
import { UserContext } from "../../Layout/Layout";
import { Link } from "react-router-dom";

const JeuDetail = () => {

  const { gameId } = useParams();
  const [game, setGame] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const { isLoggedIn } = useContext(UserContext);


  useEffect(() => {
    const fetchGameDetail = async () => {
      try {
        const response = await fetch(`http://localhost:8000/getGames/${gameId}`);


        if (response.ok) {
          const gameDetail = await response.json();
          setGame(gameDetail);
        } else {
          console.error("Il y a eu un problème avec la récupération des données");
        }
      } catch (error) {
        console.error(error);
      }
    };

    const getAchievement = async () => {
      try{
        const response = await fetch(`http://localhost:8000/getAchievement`);
        
        if (response.ok) {
          const allAchievements = await response.json();
          const gameAchievements = allAchievements.filter(achievement => achievement.jeu_id === parseInt(gameId));
          setAchievements(gameAchievements);
          console.log(gameAchievements);
        } else {
          console.log("Il y a eu une erreur");
        }
      } catch (error) {
        console.log(error);
      }
    };
        
  
    fetchGameDetail();
    getAchievement();
  

  }, [gameId]);

  return (
    
    <div className={styles.sectionJeu}>
      <h2 className={styles.titrePage}>{game?.nom_jeu}</h2>
      <div className={styles.infoJeu}>
        <img
          className={`${styles.jaquette}`}
          src={`http://localhost:8000/${game?.couverture}`}
          alt={game?.nom_jeu}
        />
        <ul>
          <li>Plateforme : {game?.plateforme}</li>
          <li>Genre: {game?.genre}</li>
          <li>Année de sortie : {game?.annee_sortie}</li>
          <li>Editeur : {game?.editeur}</li>
          <li>Développeur : {game?.developpeur}</li>
        </ul>
      </div>
      <div className={styles.achievementsSection}>
        {achievements.length > 0 ? (
          achievements.map((achievement) => (
            <Link key={achievement.id_Achievement} to={`/achievement/${achievement.id_Achievement}`}>
              <div className={styles.achievement}>
                <div>
                  <img className={styles.icone} src={`http://localhost:8000/${achievement.icon}`} alt={achievement.title} />
                </div>
                <div className={styles.info}>
                  <h3 className={styles.titre}>{achievement.title}</h3>
                  <br></br>
                  <p>{achievement.description}</p>
                </div>
                {isLoggedIn && <input type="checkbox" className={styles.complete} />}
              </div>
            </Link>
          ))
        ) : (
          <p>Aucun Achievements</p>
        )}
      </div>
    </div>
  );
};

export default JeuDetail;