import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState("")


    const storeTokenInLS = (serverToken) => {
        setToken(serverToken);
        return localStorage.setItem("token", serverToken)
    }

    const LogoutUser = () => {
        setToken("");
      return localStorage.removeItem("token");
    }

    let isLoggedIn = !!token;

    const userAuthentication = async () => {
        try {
            if (!token) {
                setUser(""); // Reset user if token is missing
                return;
            }
            const response = await fetch("https://document-management-app-fyy6.onrender.com/api/auth/user", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.ok) {
                const data = await response.json();
                setUser(data.userData);

            }
            else {
                console.log("error fetching user data");
            }
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        userAuthentication();
        // getProductList();
    }, [token])

    return <AuthContext.Provider value={{ storeTokenInLS, isLoggedIn, LogoutUser, user }}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth used outside of the provider")
    }
    return authContextValue;
}