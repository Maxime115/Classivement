import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from "./CreationAchievement.module.scss";

function Achievement() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        title: yup.string().required("Le titre est requis"),
        description: yup.string().required("La description est requise"),
        game: yup.string().required("Le jeu est requis"),
        icon: yup.mixed().required("L'icône est requise"),
      })
    )
  });

  const [icon, setIcon] = useState("");

  const handleIconChange = (event) => {
    setIcon(URL.createObjectURL(event.target.files[0]));
  };

  const onSubmit = async (data) => {
    console.log(data) // Existing log
  
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('game', data.game);
    formData.append('icon', data.icon[0]);
    
    console.log('formData: ', Data) // log formData

    //... Fetch API call


    try {
      const response = await fetch('http://localhost:8000/addAchievement', {
  method: 'POST',
  body: formData,
  
});


      if (response.ok) {
        console.log('Achievement soumis avec succès !');
        // Réinitialiser le formulaire ou effectuer d'autres actions après la soumission réussie
      } else {
        console.error('Erreur lors de la soumission de l\'achievement.');
      }
    } catch (error) {
      console.error('Erreur réseau :', error);
    }
  };

  

  return (
    <div className={styles.Achievement}>
    <h2 className={styles.titrePage}>Créer un achievement</h2>
    <p>Vous avez une idée d'achievement ? Qu'attendez-vous pour le créer et le soumettre ?</p>

    <form className={styles.Formulaire} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputGrid}>
        <div className={styles.iconInput}>
          <label htmlFor="icon" className={styles.iconLabel}>
            {icon ? <img src={icon} alt="Selected Icon" /> : 'Icone'}
          </label>
          <input id="icon" type="file" {...register('icon')} onChange={handleIconChange} hidden />
        </div>

        <div className={styles.texte}>
          <input className={styles.formulaireAchievement} {...register("title")} type="text" id="title" placeholder="Titre de l'achievement"/>
          {errors?.title && <p className={styles.texterror}>{errors.title.message}</p>}

          <input className={styles.formulaireAchievement} {...register("description")} type="text" id="description" placeholder="Description" />
          {errors?.description && <p className={styles.texterror}>{errors.description.message}</p>}

          <input className={styles.formulaireAchievement} {...register("game")} type="text" id="game" placeholder="Sélectionner le jeu pour cet achievement" />
          {errors?.game && <p className={styles.texterror}>{errors.game.message}</p>}
        </div>
      </div>

      <button className={styles.submit} type="submit">Soumettre votre achievement</button>
    </form>
  </div>
);
}

export default Achievement;
