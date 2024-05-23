import Conversations from "./Conversations";
import LogOutButton from "./LogOutButton";
import SearchInput from "./SearchInput";
import useConversation from "../../zustand/useConversation";
import {isMobile} from "react-device-detect";

const Sidebar = () => {
    const {selectedConversation} = useConversation();

	return (
		<div className={` max-md:w-full border-r border-slate-500 p-4 flex flex-col ${selectedConversation ? 'phone-hidden' : 'phone-flex'}`}>
			<SearchInput />
			<div className='divider px-3'></div>
			<Conversations />
			{isMobile ? <p className="mt-1 text-gray-200 font-semibold text-center align-bottom">Select a Chat to continue</p> : ''}
			<LogOutButton />
		</div>
	);
};
export default Sidebar;