import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./CreationAchievement.module.scss";
import { addAchievement } from "../../apis/users";


export default function Achievement() {

  const [feedback, setFeedback] = useState("");
  const [feedbackGood, setFeedbackGood] = useState("");
  const [icon, setIcon] = useState("");
  const navigate = useNavigate();
  const iconRef = useRef();



  const handleIconChange = (event) => {
    setValue('icon', event.target.files[0]);
  setIcon(URL.createObjectURL(event.target.files[0]));
  };

  const yupSchema = yup.object({

    title: yup
      .string()
      .required("Le champ est obligatoire"),

    description: yup
      .string()
      .required("Le champ est obligatoire"),

    game: yup
      .string()
      .required("Sélectionner un jeu"),

    icon: yup
      .mixed()
      .required("L'icone est obligatoire"),

  });

  const defaultValues = {
    title: "",
    description: "",
    game: "",
    icon: "",
  };

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(yupSchema),
  });

  const onSubmit = async (data) => {

    setFeedback("");
    const values = getValues();
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('game', data.game);
    formData.append('icon', data.icon);
    
    console.log('formData: ', data)
    console.log('Référence de l\'icône sélectionnée :', data.icon);


  try {
    const response = await addAchievement(formData);
      if (response.message) {
        setFeedback(response.message);
      } else {
        setFeedbackGood(response.messageGood);
        reset(defaultValues);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  }

  


  return (
    <div className={styles.Achievement}>
      <h2 className={styles.titrePage}>Créer un achievement</h2>
      <p>Vous avez une idée d'achievement ? Qu'attendez-vous pour le créer et le soumettre ?</p>

      <form className={styles.Formulaire} onSubmit={handleSubmit(onSubmit)} >
        <div className={styles.inputGrid}>
          <div className={styles.iconInput}>
            <label htmlFor="icon" className={styles.iconLabel}>
              {icon ? <img src={icon} alt="Selected Icon" /> : 'Icone'}
            </label>
            <input id="icon" type="file" {...register('icon')} onChange={handleIconChange} ref={iconRef}/>
          </div>

          <div className={styles.texte}>
            <input className={styles.formulaireAchievement} {...register("title")} type="text" id="title" placeholder="Titre de l'achievement" />
            {errors?.title && <p className={styles.texterror}>{errors.title.message}</p>}

            <textarea className={styles.formulaireAchievement} {...register("description")} type="text" id="description" placeholder="Description" />
            {errors?.description && <p className={styles.texterror}>{errors.description.message}</p>}

            <input className={styles.formulaireAchievement} {...register("game")} type="text" id="game" placeholder="Sélectionner le jeu pour cet achievement" />
            {errors?.game && <p className={styles.texterror}>{errors.game.message}</p>}
          </div>
        </div>

        <button className={styles.submit} type="submit">Soumettre votre achievement</button>
        {feedback && <p className={`${styles.feedback}`}>{feedback}</p>}
        {feedbackGood && (
          <p className={`${styles.textgood}`}>{feedbackGood}</p>
        )}
      </form>
    </div>
  );
}

