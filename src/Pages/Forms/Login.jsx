import { useContext, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import styles from "./Register.module.scss";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { signin } from "../../apis/users";
import { UserContext } from "../../context/UserContext";



export default function Login() {
  const [feedback, setFeedback] = useState("");
  const [feedbackGood, setFeedbackGood] = useState("");
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const yupSchema = yup.object({
    email: yup
      .string()
      .required('Le champ est obligatoire')
      .matches(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        "Votre email n'est pas valide"
      ),
    password: yup.string().required('Le champ est obligatoire'),
  });

  // const { login, users } = useContext(UserContext);

  const defaultValues = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(yupSchema),
  });

  async function submit(values) {
    setFeedback("");
    console.log(values);
  
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        credentials: "include",
      });
      if (response.ok) {
        const user = await response.json();
        console.log(user);
        if (user.message) {
          setFeedback(user.message);
        } else {
          reset(defaultValues);
          setFeedbackGood(user.messageGood);
          setUser(user.id);
          setTimeout(() => {
            // Navigate to the home page
            navigate("/");
            // Reload the current page
            window.location.reload();
          }, 3000);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }




  return (
    <>
      <h2 className={styles.titrePage}>Se Connecter</h2>

      <div className={styles.formulaire}>
        <form onSubmit={handleSubmit(submit)}>
          <label htmlFor="email">Adresse E-mail*</label>
          <input {...register('email')} type="text" id="email" placeholder="Adresse E-mail*" />
          {errors?.email && (
            <p className={styles.texterror}>{errors.email.message}</p>
          )}

          <label htmlFor="password">Mot de passe*</label>
          <input
            {...register('password')}
            type="password"
            id="password"
            placeholder="Mot de passe*"
          />
          {errors?.password && (
            <p className={styles.texterror}>{errors.password.message}</p>
          )}

          <button className={styles.submit}>Se Connecter</button>
          {feedback && <p className={styles.textgood}>{feedback}</p>}
        </form>
        <br></br>
        <Link to="/register"><h3>Pas encore inscrit ? S'inscrire</h3></Link>
      </div>
    </>
  );
}

