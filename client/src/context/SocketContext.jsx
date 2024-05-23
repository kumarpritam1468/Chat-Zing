import { useContext, createContext, useState, useEffect } from 'react';
import {useAuthContext} from '../context/AuthContext';
import io from 'socket.io-client';

const SocketContext = createContext();

const useSocketContext = () => {
    return useContext(SocketContext);
}

const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const {authUser} = useAuthContext();

    useEffect(() => {
        if(authUser){
            const socket = io('http://localhost:5000', {
                query:{
                    userId: authUser._id
                }
            });

            setSocket(socket);

            // Used to listen to events
            socket.on('getOnlineUsers', (users) => {
                setOnlineUsers(users);
            })
            return () => socket.close();
        } else {
            if(socket){
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]);

    return (
        <SocketContext.Provider value={{socket, onlineUsers}}>
            {children}
        </SocketContext.Provider>
    )
}

export { useSocketContext, SocketContextProvider };