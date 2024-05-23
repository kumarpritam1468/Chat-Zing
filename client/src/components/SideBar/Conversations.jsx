import useGetConversation from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";
import Conversation from "./Conversation";

const Conversations = () => {
    const { loading, conversations } = useGetConversation();

    return (
        <div className='py-1 max-md:py-0 flex flex-col overflow-auto'>
            {conversations.map((conversation, index) => (
                <Conversation
                    key={conversation._id}
                    conversation={conversation}
                    emoji={getRandomEmoji()}
                    lastIndex={index === conversations.length - 1}
                />
            ))}
            {loading ? <span className=" m-auto loading loading-spinner"></span> : null}
        </div>
    );
};
export default Conversations;