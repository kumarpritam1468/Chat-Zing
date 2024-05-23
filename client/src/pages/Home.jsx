import MessageContainer from "../components/Messages/MessageContainer";
import Sidebar from "../components/SideBar/Sidebar";

const Home = () => {

	return (
		<div className='flex h-[85vh] md:w-[65vw] max-md:w-[90vw] min-[1440px]:w-[65vw] min-[1440px]:h-[85vh] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
			<Sidebar />
			<MessageContainer />
		</div>
	);
};
export default Home;