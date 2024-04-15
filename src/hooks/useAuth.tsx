import { createContext, useContext, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { EPaths, TUser } from "../utils/types";

const defaultUser: TUser = {
    email: "",
    name: "",
    picture: "",
    exp: 0
}
const AuthContext = createContext({
    user: defaultUser,
    login: (data: TUser) => { },
    logout: () => { },
});

type AuthProviderProps = {
    children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useLocalStorage("user", null);
    const navigate = useNavigate();

    const location = useLocation();

    // route guards
    useEffect(() => {
        if (location.pathname !== EPaths.LOGIN && !user) {
            navigate(EPaths.LOGIN, { replace: true });
        }
        if (location.pathname === EPaths.LOGIN && !!user) {
            navigate(EPaths.DASHBOARD, { replace: true });
        }
    }, [user, location.pathname])

    const login = async (data: TUser) => {
        setUser(data);
        navigate(EPaths.DASHBOARD, { replace: true });
    }

    const logout = () => {
        setUser(null);
        navigate(EPaths.LOGIN, { replace: true });
    };

    const value = useMemo(
        () => ({
            user: user as TUser,
            login,
            logout,
        }),
        [user]
    );
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};