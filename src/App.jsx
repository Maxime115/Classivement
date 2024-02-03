import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import './App.css'
import Layout from './Layout/Layout'
import ListeJeux from './Pages/ListeJeux/ListeJeux'
import Apropos from './Pages/AboutMe/AboutMe'
import Register from './Pages/Forms/Register'
import Login from './Pages/Forms/Login'
import Contact from './Pages/Forms/Contact'
import Error from './Pages/ErrorPage/ErrorPage'
import Achievement from './Pages/CreationAchievement/CreationAchievement'
import AchievementDetail from "./Pages/AchievementDetail/AchievementDetail";
import JeuDetail from "./Pages/jeuDetail/jeuDetail";
import Profile from './Pages/Profile/Profile'


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      errorElement: <Error/>,

       children:[
        // Redirection vers le composant Inscription (Page inscription) avec le "/inscription" par exemple si notre site est Facebook : facebook.com/inscription
        {
          path: "/ListeJeux",
          element: <ListeJeux/>,
          errorElement: <Error/>,
        },

        {
          path: "/jeuDetail/:gameId",
          element: <JeuDetail />,
          errorElement: <Error/>,
       },
       


        {

          path: "/Register",
          element: <Register/>,
          errorElement: <Error/>,
        },

        {

          path: "/Login",
          element: <Login/>,
          errorElement: <Error/>,
        },

        {
          path: "/profile/:userId",
          element: <Profile />,
          errorElement: <Error />,
        },
        
        {

          path: "/Achievement/:userId",
          element: <Achievement/>,
          errorElement: <Error/>,
        },

        
        {

        path: "/AchievementDetail/:achievementId",
        element: <AchievementDetail/>,
        errorElement: <Error/>,

        },


        {

          path: "/Apropos",
          element: <Apropos/>,
          errorElement: <Error/>,

        },

        {

          path: "/Contact",
          element: <Contact/>,
          errorElement: <Error/>,

        }
          
          // children:[
          //   path: "/TEST",
          // element: <TEST/>,
          // errorElement: <Error/>,

          // ]
      ]
    }
    

    
  ]);

  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App