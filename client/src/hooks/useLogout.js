import toast from "react-hot-toast"
import { useAuthContext } from "../context/AuthContext";

const useLogout = () => {
    const { setAuthUser } = useAuthContext();

    const logout = async () => {

        try {
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
                headers: { "Content-Type": "application/json" }
            })

            const data = response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.removeItem('chat-user');

            setAuthUser(null);
        } catch (error) {
            toast.error(error.message);
        }
    }

    return {logout};
}

export default useLogout;