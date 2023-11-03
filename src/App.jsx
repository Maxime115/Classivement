import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css'
import Layout from './Layout/Layout'
import ListeJeux from './Pages/ListeJeux/ListeJeux'

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
          
          // children:[
          //   path: "/TEST",
          // element: <TEST/>,
          // errorElement: <Error/>,

          // ]
        },
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