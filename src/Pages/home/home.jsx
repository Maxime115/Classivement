import { useState } from 'react';
import Navbar from '../navbar/navbar.jsx';
import Section1 from '../section1/section1.jsx';
import Textbox from '../textbox/textbox.jsx'
import styles from "./home.module.scss"
import Todolist from "../todolist/todolist.jsx"
import Formulaire from "../Formulaire/formulaire.jsx"
import Todo from "../Todo/Todo.jsx"


function Home() {

  const [count, setCount] = useState(0);

  return (
    <>
    <div class={styles.home}>
    <Navbar/>
    <Section1/>
    <h1>Exercice 1</h1>
    
     <h2>Compteur : {count}</h2>
     <br></br>
    <br></br>
     <button onClick={() => setCount(count + 1)}>Incremente</button>
     <button onClick={() => setCount(count - 1)}>Decremente</button>
     <br></br>
     <br></br>
     <h2>*********************************</h2>
     
     <h1>Exercice 2</h1>
     
    <Textbox/>
    <br></br>
    <br></br>
    <Todolist/>
    <br></br>
    <br></br>
    <br></br>
    <Formulaire/>
    <br></br>
    <br></br>
    <Todo/>
    </div>
    
    
    
    </>

    
  )
}

export default Home
