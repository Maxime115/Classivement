
import styles from "./Layout.module.scss";
import { useLocation, Outlet } from "react-router-dom";
import Home from "../Pages/home/home.jsx";
import Navbar from "../Pages/navbar/navbar.jsx";
import Footer from "../Pages/Footer/Footer.jsx";
import { createContext, useState, useEffect } from "react";
import { set } from "lodash";

export const UserContext = createContext();

const Layout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [id, setid] = useState(""); 
  const [admin, setAdmin] = useState("");
  const [ban, setBan] = useState("");

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await fetch("http://localhost:8000/getUser", {
          method: 'GET',
          credentials: "include",
        });
        const data = await response.json();
    
        if (data.valid) {
          setIsLoggedIn(true);
          setUsername(data.username);
          setid(data.id_Users);
          setAdmin(data.admin);
          setBan(data.ban);
          console.log(data.admin);

        } else {
          setIsLoggedIn(false);
          setUsername("");
          setid(""); 
          setAdmin("");
          setBan("");
        }
      } catch (error) {
        console.error("Error checking user:", error);
      }
    };

    checkUser();
  }, []); 

 

  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        await fetch("http://localhost:8000/refreshSession", {
          credentials: "true",
        });
      } catch (error) {
        console.error("Error refreshing session:", error);
      }
    }, 15 * 60 * 1000); // Refresh every 15 minutes

    return () => clearInterval(intervalId); // Cleanup function to clear the interval when the component unmounts
  }, []);

  const { pathname } = useLocation();

  const user = { isLoggedIn, setIsLoggedIn, username, setUsername, id, setid, admin, setAdmin, ban, setBan };

  console.log(username);
  console.log(id);
  
  return (
    <>
    <UserContext.Provider value={user}>
      <div className={styles.site}>
        {pathname !== "/navbar" && <Navbar />}
        <div className={styles.section}>
          <div>
            {isLoggedIn ? (
              <p>Bonjour, {username}!</p>
            ) : (
              <p>Vous n'êtes pas inscrit ? Inscrivez-vous</p>
            )}
            <br />
          </div>
          {pathname === "/" ? <Home /> : <Outlet />}
        </div>
        {pathname !== "/Footer" && <Footer />}
      </div>
      </UserContext.Provider>
    </>
  );
};

export default Layout;
