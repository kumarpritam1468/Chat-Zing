import { useContext, createContext, useState, useEffect } from 'react';
import {useAuthContext} from '../context/AuthContext';
import io from 'socket.io-client';

const SocketContext = createContext();

const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const {authUser} = useAuthContext();

    useEffect(() => {
        if(authUser){
            const socket = io('http://localhost:5000');

            setSocket(socket);
            return () => socket.close();
        } else {
            if(socket){
                socket.close();
                setSocket(null);
            }
        }
    }, []);

    return (
        <SocketContext.Provider value={{socket, onlineUsers}}>
            {children}
        </SocketContext.Provider>
    )
}

export { SocketContextProvider };