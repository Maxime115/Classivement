import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { UserContext } from '../../Layout/Layout';
import styles from './AchievementDetail.module.scss';

const AchievementDetail = () => {
  const { achievementId } = useParams();
  
  const [achievement, setAchievement] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [feedbackGood, setFeedbackGood] = useState("");
  const [comments, setComments] = useState([]);
  const { isLoggedIn, id: userId } = useContext(UserContext);


  

  useEffect(() => {
    const fetchAchievementDetail = async () => {
      try {
        const response = await fetch(`http://localhost:8000/getAchievement/${achievementId}`);

        if (response.ok) {
          const achievementDetail = await response.json();

          try {
            const gameResponse = await fetch(`http://localhost:8000/getGames/${achievementDetail.jeu_id}`);

            if (gameResponse.ok) {
              const game = await gameResponse.json();
              setAchievement({ ...achievementDetail, gameName: game.nom_jeu });
            } else {
              console.log(`Failed to fetch game for achievement with jeu_id ${achievementDetail.jeu_id}`);
              setAchievement(achievementDetail);
            }
          } catch (gameError) {
            console.error('Error fetching game:', gameError);
            setAchievement(achievementDetail);
          }
        } else {
          console.error('There was a problem fetching achievement data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:8000/getComments/${achievementId}`);

        if (response.ok) {
          const commentsData = await response.json();
          setComments(commentsData);
        } else {
          console.error('Il y a eu un problème avec la récupération des commentaires');
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchAchievementDetail();
    fetchComments();
  }, [achievementId]);

  const yupSchema = yup.object({
    comment: yup.string().required("Le champ est obligatoire")
  });

const defaultValues = {
    comment: "",  // Use "commentaires" instead of "comment"
    id_Users: userId,
    id_Achievements: achievementId,
    
  };

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(yupSchema),
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log('onSubmit triggered');
    setFeedback("");
    const values = getValues();
    const formData = new FormData();
    const requestData = {
      id_Users: values.id_Users,
      comment: values.comment,
    };
  
    console.log(formData);
    console.log(values);
  
    try {
      const response = await fetch(`http://localhost:8000/postComment/${achievementId}/${userId}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json', // Set the content type to JSON
        },
        body: JSON.stringify(requestData), // Stringify the data
      });
  
      if (response.ok) {
        setFeedbackGood("Commentaire ajouté");
        reset(defaultValues);
      } else {
        setFeedback("Il y a eu un problème avec l'envoi du commentaire");
        console.log("Il y a eu une erreur");
        console.log(requestData);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await fetch(`http://localhost:8000/deleteComment/${commentId}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        // Update the comments state after successful deletion
        const updatedComments = comments.filter(comment => comment.id_commentaires !== commentId);
        setComments(updatedComments);
      } else {
        console.error("Failed to delete comment");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };
  

  return (
    <div className={styles.sectionCommentaire}>
      <div className={styles.achievement} key={achievement?.id_Achievement}>
        <div>
          <img className={styles.icone} src={`http://localhost:8000/${achievement?.icon}`} alt={achievement?.title} />
          <h4>Créé par {achievement?.username}</h4>
          <h4>Jeu : {achievement?.gameName}</h4>
        </div>
        <div className={styles.info}>
          <h3 className={styles.titre}>{achievement?.title}</h3>
          <br />
          <p>{achievement?.description}</p>
        </div>
        {isLoggedIn && <input type="checkbox" className={styles.complete} />}
      </div>
      <div className={`${styles.comment} ${styles.commentaire}`}>
        <h2 className={styles.titrePage}>Section Commentaires</h2>
        <br></br>
        {comments.length > 0 ? (
          <ul>
            {comments.map(comment => (
              <div className={styles.achievement}>
                <div>
                  <img className={styles.avatar} src={`http://localhost:8000/${comment.avatar}`} alt={comment.username} />
                  <h4>{comment.username}</h4>           
                </div>
                <div>
                  <p className={styles.align}>{comment.commentaires}</p>
                </div>
                {comment.id_Users === userId && (
                <button onClick={() => handleDeleteComment(comment.id_commentaires)}>
                 <i class="fa-solid fa-trash fa-xs"></i>
                </button>
      )}
                
              </div>

              // <li key={comment.id_commentaires}>
              //   <div>
              //     <img
              //       className={styles.avatar}
              //       src={`http://localhost:8000/${comment.user_avatar}`}
              //       alt={`${comment.username}'s avatar`}
              //     />
              //     <h4>{comment.username}</h4>
              //   </div>
              //   <div className={styles.commentContent}>
              //     <p>{comment.commentaires}</p>
              //   </div>
              // </li>
            ))}
          </ul>
        ) : (
          <p>Aucun commentaire</p>
        )}
        <br></br>
        {isLoggedIn ? (
          <form onSubmit={(event) => handleSubmit(onSubmit(event))}>
          <textarea
            className={styles.formulaireAchievement}
            {...register('comment', { required: 'Le champ est obligatoire' })}
            type="text"
            id="comment"
            placeholder="Ecris un commentaire..."
            />
            {errors.commentaire && <p className={styles.texterror}>{errors.commentaire.message}</p>}
            <button className={styles.submit}>Poster le commentaire</button>
        </form>
      ) : (
        <p>Connectez-vous pour pouvoir poster un commentaire</p>
      )}
      </div>
    </div>
  );
};

export default AchievementDetail;
