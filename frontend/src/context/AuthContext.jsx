import api from "@/lib/api";
import { createContext, useContext, useEffect, useState } from "react"
import { Navigate } from "react-router-dom";
import axios from "axios";
import { BeatLoader } from "react-spinners"

const AuthContext = createContext();

export const AuthProvider = ({children})=>{

    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const baseWithoutApi = import.meta.env.VITE_API_BASE_URL.replace(/\/api$/, '');

    useEffect(()=>{
        checkAuth();
    },[]);
    

    const checkAuth = async () => {
        try {
            await axios.get(`${baseWithoutApi}/sanctum/csrf-cookie`, {
            withCredentials: true,
            });
    
            const token = localStorage.getItem('auth_token');
    
            if (token) {
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const response = await api.get('/user');
                setUser(response.data);
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.log(error);
            clearAuthState();
        } finally {
            setLoading(false);
        }
    };
    
    const updateAuthState=(token,userData)=>{
        localStorage.setItem('auth_token',token);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser(userData);

    }

    const clearAuthState=()=>{
        localStorage.removeItem('auth_token');
        delete api.defaults.headers.common['Authorization'];
        setUser(null);

    }

    return (
        <AuthContext.Provider value={{ user, updateAuthState, loading ,isAuthenticated ,checkAuth ,clearAuthState}}>
          {children}
        </AuthContext.Provider>
      );
}


export const  useAuth=()=> useContext(AuthContext);



export function PrivateRoute({ children }) {

    const { isAuthenticated,loading } = useAuth();

    if (loading) {
        return (
            <>
            <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
               <BeatLoader color="#9c20d5" />
            </div>  
            </>
        )}

    return isAuthenticated ? children : <Navigate to="/"  replace/>;

  }