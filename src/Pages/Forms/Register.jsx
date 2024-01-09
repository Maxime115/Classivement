import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Register.module.scss";
import { signup } from "../../apis/users";


export default function Register({ changeView }) {
  const [feedback, setFeedback] = useState("");
  const [feedbackGood, setFeedbackGood] = useState("");
  const navigate = useNavigate();
  const avatarRef = useRef();

  const yupSchema = yup.object({
    username: yup
      .string()
      .required("Le champ est obligatoire")
      .min(2, "Le champ doit comporter 2 caractères")
      .max(12, "Le champ ne doit pas contenir plus de 12 caractères"),
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
    getValues,
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
      formData.append("avatar", avatarRef.current.files[0]);
    }
    console.log(formData);
    try {
      const response = await signup(formData);
      if (response.message) {
        setFeedback(response.message);
      } else {
        setFeedbackGood(response.messageGood);
        reset(defaultValues);
        setTimeout(() => {
          navigate("/Login");
        }, 3000);
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
      

          <label htmlFor="cgu">J'ai lu et accepte les CGU</label>
          <input {...register("cgu")} className={styles.checkbox} type="checkbox" id="cgu" />
          {errors?.cgu && <p className={`${styles.texterror}`}>{errors.cgu.message}</p>}

          <button className={styles.submit}>S'inscrire</button>
          {feedback && <p className={`${styles.feedback}`}>{feedback}</p>}
        {feedbackGood && (
          <p className={`${styles.textgood}`}>{feedbackGood}</p>
        )}

          <Link to="/login"><h3 className={styles.underline}>Déjà un compte ? Connecter-vous</h3></Link>
          
        </form>
        <br></br>
      
      </div>
    </>
  );
        }
