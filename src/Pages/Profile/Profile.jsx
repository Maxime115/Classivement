import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./Profile.module.scss";
import EditProfil from "../Forms/EditProfil";
import { UserContext } from "../../Layout/Layout.jsx";


const Profile = () => {
  const { id: contextUserId } = useContext(UserContext);
    const { userId } = useParams();
    const [userData, setUserData] = useState(null);
    const [favoriteGame, setFavoriteGame] = useState(null);
    const [achievements, setAchievements] = useState([]);
    const [editMode, setEditMode] = useState(false);

    

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`http://localhost:8000/getUserProfile/${userId}`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        setUserData(data);

        if (data.jeu_id) {
          const gameResponse = await fetch(`http://localhost:8000/getGames/${data.jeu_id}`);
          const gameData = await gameResponse.json();
          setFavoriteGame(gameData);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    const getAchievement = async () => {
      try {
        const response = await fetch(`http://localhost:8000/getAchievement`);

        if (response.ok) {
          const allAchievements = await response.json();
          const userAchievements = allAchievements.filter(achievement => achievement.id_Users === parseInt(contextUserId));
          setAchievements(userAchievements);
          console.log(userAchievements);
        } else {
          console.log("Il y a eu une erreur");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserProfile();
    getAchievement();
  }, [userId]);

  const toggleEditMode = () => {
    console.log("userId dans toggleEditMode:", userId);
    console.log("userData dans toggleEditMode:", userData);
    if (userData && userId && userData.id_Users === parseInt(userId)) {
      setEditMode(!editMode);
    } else {
      console.log("Vous n'êtes pas autorisé à modifier ce profil");
    }
    
  };

  

  return (
    <div className={styles.profileContainer}>
      {userData && (
        <>
          <h2 className={styles.titrePage}>Profil de {userData.username}</h2>
          <br></br>
          <br></br>
          <div className={styles.columnsContainer}>
          <div className={styles.colonneGauche}>
              <h3>Jeu rétro favori</h3>
              <br></br>
              <br></br>
              
              {favoriteGame ? (
                <>
                <div className={styles.jeuFavori}>
                  <Link to={`/jeuDetail/${favoriteGame.jeu_id}`} key={favoriteGame.jeu_id}>

                  <figure key={favoriteGame.jeu_id} className={`${styles.jaquetteContainer}`}>
                    <img
                      className={`${styles.jaquette} ${styles.imageCommonStyles}`}
                      src={`http://localhost:8000/${favoriteGame.couverture}`}
                      alt={favoriteGame.nom_jeu}
                    />
                    <figcaption className={styles.jaquetteCaption}>
                      <h2>{favoriteGame.nom_jeu}</h2>
                      <br />
                      <h3>{favoriteGame.plateforme}</h3>
                      <br />
                      <h3>{favoriteGame.annee_sortie}</h3>
                      
                    
                      <div className={styles.additionalInfo}>
                        <h4>{favoriteGame.developpeur}</h4>
                        <h4>Score : {favoriteGame.score_popularite}</h4>
                  </div>
                  </figcaption>
                  </figure>
                  </Link>
                  </div>
                </>
              ) : (
                <p>Aucun jeu favori :( </p>
              )}
              <br></br>
              <br></br>
              <h3>Derniers achievements créées</h3>
              {achievements.length > 0 ? (
          achievements
          .sort((a, b) => b.id_Achievement - a.id_Achievement)
          .slice(0, 3)
          .map((achievement) => (
            <div key={achievement.id_Achievement} className={styles.achievement}>
              <div>
                <img className={styles.icone} src={`http://localhost:8000/${achievement.icon}`} alt={achievement.title} />
              </div>
              <div className={styles.info}>
                <h3 className={styles.titre}>{achievement.title}</h3>
                <br />
                <p>{achievement.description}</p>
              </div>
              <Link to={`/achievementDetail/${achievement.id_Achievement}`}><button className={styles.enSavoir}>En savoir +</button></Link>
            </div>
          ))
      ) : (
        <p>Aucun Achievements créées :( </p>
        )}
        
            </div>
            <div className={styles.colonneDroite}>
              <div className={styles.profil}>
                {userData.avatar ? (
              <img className={styles.profilImg} src={`http://localhost:8000/${userData.avatar}`} alt={userData.username} />
              ) : (
                <i class="fa-solid fa-user fa-8x blue"></i>
              )}
              <br></br>
              <br></br>
              <h3>{userData.username}</h3>
              <br></br>
              <h3>{userData.email}</h3>
              
              <br></br>
              <p>Aucune Bio</p>
              {editMode ? (
            // Render the edit form when in edit mode
            <EditProfil userData={userData} setUserData={setUserData} toggleEditMode={toggleEditMode} />
          ) : (
            // Render the profile details when not in edit mode
            <>
              {userId && userData.id_Users === parseInt(contextUserId) && (
              <button onClick={toggleEditMode}>Modifier</button>
            )}
            </>
          )}
              </div>

            </div>
            </div>
        </>
      )}
    </div>
    
  );
};

export default Profile;
