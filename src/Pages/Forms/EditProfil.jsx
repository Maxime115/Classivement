import React from "react";
import { useForm } from "react-hook-form";
import { useState, useRef, useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateProfile } from "../../apis/users";
import styles from "./Register.module.scss";
import { useParams } from "react-router-dom";

const EditProfil = ({ userData, setUserData, toggleEditMode }) => {

    const [feedback, setFeedback] = useState("");
    const [feedbackGood, setFeedbackGood] = useState("");
    const avatarRef = useRef();
    const { userId } = useParams();
    const [games, setGames] = useState([]);
    
   
    const yupSchema = yup.object({
        username: yup
        .string()
        .required("Le champ est obligatoire")
        .min(2, "Le champ doit comporter 2 caractères")
        .max(25, "Le champ ne doit pas contenir plus de 25 caractères"),
        email: yup
      .string()
      .email("Votre email n'est pas valide")
      .required("Le champ est obligatoire")
      .matches(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        "Votre email n'est pas valide"
      ),
      password: yup
      .string()
      .required("Le champ est obligatoire")
      .min(5, "Le champ doit comporter 5 caractères"),
    confirmPassword: yup
      .string()
      .required("Le champ est obligatoire")
      .oneOf(
        [yup.ref("password"), ""],
        "Les mots de passe ne correspondent pas"
      ),
    });

    const defaultValues = {
        username: userData.username,
        email: userData.email,
        password: "",
        confirmPassword: "",
        avatar: userData.avatar,
        game: userData.jeu_id,
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

      useEffect(() => {
        const getGames = async () => {
          try {
            const response = await fetch("http://localhost:8000/getGames");
            if (response.ok) {
              const jeuData = await response.json();
              setGames(jeuData);
            } else {
              console.log("Il y a eu une erreur");
            }
          } catch (error) {
            console.log(error);
          }
        };
      
        getGames(); // Call the function inside useEffect
      }, []);
    

      const onSubmit = async () => {
        setFeedback("");
        const values = getValues();
        const formData = new FormData();
        formData.append("username", values.username);
        formData.append("email", values.email);
        formData.append("password", values.password);
    
        if (avatarRef.current && avatarRef.current.files[0]) {
          formData.append("avatar", avatarRef.current.files[0]);
        }
    
        formData.append("game", values.game);
        
        try {
            console.log(formData);
            console.log(values);

            await updateProfile(formData, userId); // Implement this function in your API
           
            setUserData(userData);
            toggleEditMode(); // Exit edit mode
          } catch (error) {
            console.error(error);
            // Handle error
          }
        };

        

        return (
            
            <div className={styles.EditProfil}>
            <form onSubmit={handleSubmit(onSubmit)} >
            <label htmlFor="name">Nom d'utilisateur*</label>
          <input {...register("username")} type="text" id="name" placeholder="Nom d'utilisateur*" />

          {errors?.username && (
            <p className={`${styles.texterror}`}>{errors.username.message}</p>
          )}

        <label htmlFor="email">Adresse E-mail*</label>
          <input {...register("email")} type="text" id="email" placeholder="Adresse E-mail*" />

          {errors?.email && (
            <p className={`${styles.texterror}`}>{errors.email.message}</p>
          )}

        <label htmlFor="password">Mot de passe*</label>
          <input {...register("password")} type="password" id="password" placeholder="Mot de passe*" />

          {errors?.password && (
            <p className={`${styles.texterror}`}>{errors.password.message}</p>
          )}

          <label htmlFor="confirmPassword">Confirmer mot de passe*</label>
          <input {...register("confirmPassword")} type="password" id="confirmPassword" placeholder="Confirmer Mot de passe*" />
          {errors?.confirmPassword && (
            <p className={`${styles.texterror}`}>{errors.confirmPassword.message}</p>
          )}

        <label htmlFor="avatar">Sélectionner une image de profil</label>
          <input type="file" id="avatar" ref={avatarRef} />

          <label htmlFor="game">Sélectionner votre jeu favori</label>
          {games && games.length > 0 ? (
            
              <select className={styles.selectGame} {...register("game")}>
                <option value="">Sélectionner un jeu</option>
                {games
                  .slice()
                  .sort((a, b) => a.nom_jeu.localeCompare(b.nom_jeu)) // Sort the games alphabetically
                  .map((game) => (
                    <option key={game.jeu_id} value={game.jeu_id}>
                      {game.nom_jeu}
                    </option>
                  ))}
              </select>
            ) : (
              <p>Erreur</p>
            )}

              <button type="button" onClick={toggleEditMode}>
                Annuler
              </button>
              <button type="submit">Enregistrer</button>
            </form>
            </div>
          );
        };
        
        export default EditProfil;
