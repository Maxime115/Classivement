import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css'
import Layout from './Layout/Layout'
import ListeJeux from './Pages/ListeJeux/ListeJeux'
import Apropos from './Pages/AboutMe/AboutMe'
import Register from './Pages/Register/Register'
import Login from './Pages/Register/Login'
import Error from './Pages/ErrorPage/ErrorPage'
import Achievement from './Pages/CreationAchievement/CreationAchievement'

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

          path: "/Achievement",
          element: <Achievement/>,
          errorElement: <Error/>,
        },


        {

          path: "/Apropos",
          element: <Apropos/>,
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