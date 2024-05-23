import { TiMessages } from "react-icons/ti";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import useConversation from "../../zustand/useConversation";
import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { RiArrowGoBackFill } from "react-icons/ri";

const MessageContainer = () => {
    const { selectedConversation, setSelectedConversation } = useConversation();

    useEffect(() => {
        setSelectedConversation(null);
    }, [setSelectedConversation]);

    return (
        <div className={`w-full flex flex-col ${selectedConversation ? 'phone-flex' : 'phone-hidden'}`}>

            {!selectedConversation ? (<NoChatSelected />) : (
                <>
                    {/* Header */}
                    <div className='bg-slate-500 px-4 py-2 mb-2 flex gap-2 items-center'>
                        <button type='submit' className='btn btn-circle text-white bg-blue-500 inset-y-0 end-0 flex items-center justify-center text-lg' onClick={() => setSelectedConversation(null)}>
                            <RiArrowGoBackFill/>
                        </button>
                        <span className='label-text'>To:</span> <span className='text-gray-900 font-bold'>{selectedConversation?.fullName}</span>
                    </div>

                    <Messages />
                    <MessageInput />
                </>
            )
            }
        </div>
    );
};

const NoChatSelected = () => {
    const { authUser } = useAuthContext();
    return (
        <div className='flex items-center justify-center w-full h-full'>
            <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex w-full justify-center flex-col items-center gap-2'>
                <p>Welcome 👋 {authUser.fullName} ❄</p>
                <p>Select a chat to start messaging</p>
                <TiMessages className='text-3xl md:text-6xl text-center' />
            </div>
        </div>
    );
};

export default MessageContainer;