import styles from "./formulaire.module.scss";
import {useForm} from "react-hook-form";

const formulaire = () => {
    const {handleSubmit, register, formState : {errors}} = useForm();
    const onSubmit = (data) => {
        console.log(data);
        console.log(password)
    }
   
    return(
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Name :</label>
                    <input type="text" {...register("name", {required : true})}/>
                    {errors.name && <p>Ce champ est requis</p>}
                </div>
                <div>
                    <label>Email :</label>
                    <input type="email" {...register("email")}/>
                    
                </div>
                <div>
                    <label>Password :</label>
                    <input type="password" {...register("password")}/>
                    
                </div>
                <button type="submit">Send</button>
            </form>
        </div>
    )
}
export default formulaire