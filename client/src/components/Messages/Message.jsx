import {useAuthContext} from '../../context/AuthContext'
import useConversation from '../../zustand/useConversation';
import {extractTime} from '../../utils/extractTime';

const Message = ({ message }) => {
	const {authUser} = useAuthContext();
	const {selectedConversation} = useConversation();
	const fromMe = message.senderId === authUser._id;
	const chatClass = fromMe ? 'chat-end' : 'chat-start';
	const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
	const bubbleBg = fromMe ? 'bg-blue-500' : '';
	const formattedTime = extractTime(message.createdAt);

	return (
		<div className={`chat ${chatClass} `}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='chat bubble' src={profilePic} />
				</div>
			</div>
			<div className={`chat-bubble ${bubbleBg} text-white  pb-2`}>{message.message}</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
		</div>
	)
}

export default Message