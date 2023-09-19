import styles from "./todolist.module.scss";

import { useState } from 'react';



function TodoList() {
    const [todos, setTodos] = useState([]);
    const [texte, setTexte] = useState('');
  
    const handleChange = (event) => {
      setTexte(event.target.value);
    }
  
    const addTodo = () => {
      if (texte.trim() !== '') {
        setTodos([...todos, texte]);
        setTexte('');
      }
    }

    return (
        <div>
          <h1>TodoList</h1>
          <input
            type="text"
            id={styles.todolist}
            value={texte}
            onChange={handleChange}
            placeholder="Ajouter une tâche"
          />
          <button onClick={addTodo}>Ajouter</button>
          <ul>
            {todos.map((todo, index) => (
              <li key={index}>{todo}</li>
            ))}
          </ul>
        </div>
      );
    }
    
    export default TodoList;
