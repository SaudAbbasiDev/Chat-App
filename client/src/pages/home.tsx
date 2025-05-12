import ChatArea from "../components/chatbox";
import { useMsgStore } from "../components/msgstore";
import Nonchat from "../components/nonchat";
import Sidebar from "../components/sidebar";

const Home = () => {
  const { selectedUser } = useMsgStore();

  return (
    <>
  
      <div className="flex h-screen w-screen bg-white">
        <Sidebar />
        {selectedUser == null ? <Nonchat /> : <ChatArea />}
      </div>
    </>
  );
};

export default Home;
