import { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./Register.module.scss"
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";


export default function Register({ changeView }) {
    const [feedback, setFeedback] = useState("");
    const [feedbackGood, setFeedbackGood] = useState("");
    const [errorPoster, setErrorPoster] = useState("");
    const navigate = useNavigate();
    const avatarRef = useRef();

    const yupSchema = yup.object({
        name: yup
      .string()
      .required("Le champ est obligatoire")
      .min(2, "Le champ doit comporter 2 caractères")
      .max(12, "Le champ ne doit pas contenir plus de 12 caractères"),
      email: yup
      .string()
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
    cgu: yup.boolean().oneOf([true], "Vous devez accepter les CGU"),
  });

  const defaultValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    cgu: false,
    avatar: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(yupSchema),
  });

  async function submit() {
    setFeedback("");
    const values = getValues();
    const formData = new FormData();
    formData.append("username", values.username);
    formData.append("email", values.email);
    formData.append("password", values.password);
    if (avatarRef.current && avatarRef.current.files[0]) {
      const maxFileSize = 500000;
      if (avatarRef.current.files[0].size > maxFileSize) {
        setErrorPoster("Le fichier est trop lourd");
        return;
      }
      const supportedExtensions = ["jpg", "jpeg", "png", "avif"];
      const fileExtension = avatarRef.current.files[0].name
        .split(".")
        .pop()
        .toLowerCase();
      if (!supportedExtensions.includes(fileExtension)) {
        setErrorPoster("Format de fichier non supporté.");
        return;
      }
      formData.append("avatar", avatarRef.current.files[0]);
    }
    console.log(formData);
    try {
      const response = await signup(formData);
      if (response.message) {
        setFeedback(response.message);
      } else {
        setFeedbackGood(response.messageGood);
        setErrorPoster("");
        reset(defaultValues);
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
    <h2 className={styles.titrePage}>S'inscrire</h2>

    <div className={styles.formulaire}>
    <form onSubmit={handleSubmit(submit)}>
    <label htmlFor="name">
            Nom d'utilisateur*
    </label>
    <input {...register("name")} type="text" id="name" placeholder="Nom d'utilisateur*"/>
    {errors?.name && <p className={styles.texterror}>{errors.name.message}</p>}
    
    <label htmlFor="email">
            Adresse E-mail*
    </label>
    <input {...register("email")} type="text" id="email" placeholder="Adresse E-mail*" />
    {errors?.email && (
    <p className={styles.texterror}>{errors.email.message}</p>
    )}
    
    <label htmlFor="password">
            Mot de passe*
          </label>
          <input {...register("password")} type="password" id="password" placeholder="Mot de passe*" />
          {errors?.password && (
            <p className={styles.texterror}>{errors.password.message}</p>
          )}
    <label htmlFor="confirmPassword">
            Confirmer le mot de passe*
          </label>
          <input
            {...register("confirmPassword")}
            type="password"
            id="confirmPassword"
            placeholder="Confirmer le mot de passe*"
          />
          {errors?.confirmPassword && (
            <p className={styles.texterror}>{errors.confirmPassword.message}</p>
          )}
            <label htmlFor="avatar" className="mb10">
            Avatar
          </label>
          <input type="file" id="avatar" ref={avatarRef} />
          {errorPoster && <p className={styles.texterror}>{errorPoster}</p>}
           <label htmlFor="cgu">
            J'ai et accepte les CGU
          </label>
          <input className={styles.checkbox} {...register("cgu")} type="checkbox" id="cgu" />
          {errors?.cgu && <p className={styles.texterror}>{errors.cgu.message}</p>}
        <button className={styles.submit}>S'inscrire'</button>
        {feedback && <p className={styles.textgood}>{feedback}</p>}
      </form>
    </div>
    
    </>

    
  )
}