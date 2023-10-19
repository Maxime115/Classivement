import { useEffect, useState } from "react";

const Todo = () => {
    const [todolist, setTodoList] = useState([])
    
    useEffect( () => {
        async function getTodo() {
            try {
                const response = await fetch("http://localhost:8000/getTodos")
                if (response.ok){
                    const todos = await response.json();
                    setTodoList(todos)
                } else {
                    console.log("Il y a eu une erreur");
        
                }

            } catch (error) {
                console.log(error);
            }
        }
        getTodo();
    }, [])
    return(
        <>

        {todolist.map((personnage) =>
            <p classkey={personnage.IdPersonnage}>{personnage.Nom_Personngage}</p>
        
        )}
        </>
    )
}
export default Todo;