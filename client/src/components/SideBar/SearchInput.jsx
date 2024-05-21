import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversations from '../../hooks/useGetConversations'
import toast from "react-hot-toast";

const SearchInput = () => {
    const [input, setInput] = useState('');
    const {setSelectedConversation} = useConversation();
    const {conversations} = useGetConversations();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!input) {
            return;
        }
        if(input.length < 3){
            return toast.error("Search must be 3 letters at least");
        }

        const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(input.toLowerCase()));

        if(conversation){
            setSelectedConversation(conversation);
            setInput('');
        } else {
            toast.error("No such user found!");
        }
    }

    return (
        <form className='flex items-center gap-2' onSubmit={handleSubmit}>
            <input type='text' placeholder='Search…' className='input input-bordered rounded-full' value={input} onChange={(e) => setInput(e.target.value)} />
            <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
                <IoSearchSharp className='w-6 h-6 outline-none' />
            </button>
        </form>
    );
};
export default SearchInput;