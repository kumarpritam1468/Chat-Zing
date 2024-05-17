import { useState } from "react"
import toast from "react-hot-toast";

const useSignup = () => {
    const [loading, setLoading] = useState(false);

    const signup = async ({ fullName, userName, gender, password, confirmPassword }) => {
        const success = handleError({ fullName, userName, gender, password, confirmPassword });

        if (!success) {
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('/api/auth/signup', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fullName, userName, gender, password, confirmPassword })
            })

            const data = await response.json();
            console.log(data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return {signup, loading};
}

const handleError = ({ fullName, userName, gender, password, confirmPassword }) => {
    if (!fullName || !userName || !gender || !password || !confirmPassword) {
        toast.error("Fill all the fields");
        return false;
    }

    if (password !== confirmPassword) {
        toast.error("Passwords should match!");
        return false;
    }

    if (password.length < 6) {
        toast.error("Password should be at least 6 characters");
        return false;
    }

    return true;
}

export default useSignup