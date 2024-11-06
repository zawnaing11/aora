import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "@/lib/appwrite";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
    const [isLoggedin, setIsLoggedin] = useState(false)
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getCurrentUser()
            .then((data) => {
                if (data) {
                    setIsLoggedin(true);
                    setUser(data);
                } else {
                    setIsLoggedin(false);
                    setUser(null);
                }
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                isLoggedin,
                setIsLoggedin,
                user,
                setUser,
                isLoading,
             }}
        >
            { children }
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;
