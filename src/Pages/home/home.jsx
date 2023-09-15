import Navbar from '../navbar/navbar.jsx';
import Section1 from '../section1/section1.jsx';
import ListeJeux from '../listeJeux/listeJeux.jsx'
import styles from "./home.module.scss"


function Home() {

  return (
    <>
    <div class={styles.home}>
    <Navbar/>
    <Section1/>
    <ListeJeux/>
    </div>
    </>
  )
}

export default Home
