import { useEffect, useState } from "react";

const Todo = () => {
    const [todoList, setTodoList] = useState([{Nom_Personnage:""}])

    useEffect( () => {
        async function getTodo(){
            try{
                const response = await fetch("http://localhost:8000/getPerso");
                if (response.ok){
                    const todos = await response.json();
                    console.log(todos);
                    setTodoList(todos)
                } else{
                    console.log("Il y a eu une erreur");
                }
            } 
            catch (error){
                console.log(error);
            }
        }
        getTodo();
    }, [])

    return(
        <>
        {console.log(todoList)}
        <p>NOM PERSO : {todoList[0].Nom_Personnage}</p>
        <br></br>
        <p>AGE : {todoList[0].Age}</p>
        
        
        {/* {todoList.map((todos) => 
           { return <div> <p key={todos.id}>{todos.Nom_Personnage} </p></div>}
            
        )} */}
        <p></p>
        
        
        </>
    )
}
export default Todo;

