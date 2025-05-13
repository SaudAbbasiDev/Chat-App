import { PanelRightClose, Users } from "lucide-react";
import { useMsgStore } from "./msgstore";
import { useEffect } from "react";
import { useAuthStore } from "./authstore";

const Sidebar = () => {
  const { users, getUsers, selectedUser, setSelectedUser } = useMsgStore();
  const { Onlineusers, authUser } = useAuthStore();
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <>
      <div className="w-[30%] h-[95%] bg-white border-r border-gray-200 p-4 hidden md:block">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <Users className="mr-2" size={20} />
          Users
        </h2>

        <div className="space-y-2">
          {users
            ?.filter((user: any) => user._id !== authUser?._id)
            .map((user: any) => (
              <button
                key={user?._id}
                onClick={() => setSelectedUser(user)}
                className="w-full"
              >
                <div
                  className={`flex w-full items-center p-3 hover:bg-gray-100 rounded-lg cursor-pointer ${
                    selectedUser?._id === user._id ? "bg-gray-100" : ""
                  }`}
                >
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                      <img
                        src={user.profilePic || "/avatar.png"}
                        alt=""
                        className="rounded-full"
                      />
                    </div>
                    {Onlineusers?.includes(user._id) ? (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    ) : (
                      <>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-gray-500 rounded-full border-2 border-white"></div>
                      </>
                    )}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">{user.username}</p>
                    <p className="text-xs text-gray-500">
                      {Onlineusers?.includes(user._id) ? "Online" : "Offline"}
                    </p>
                  </div>
                </div>
              </button>
            ))}
        </div>
      </div>{" "}


      {/* mobile sidebar */}
      <div className="drawer max-md:block hidden mt-6 ml-2 mr-2 w-0">
  <input id="my-drawer" type="checkbox" className="drawer-toggle " />
  <div className="drawer-content ">

    <label htmlFor="my-drawer" className="btn btn-primary drawer-button bg-white  border-none shadow-none"><PanelRightClose size={40} color="indigo" className="" /></label>
  </div>
  <div className="drawer-side">
    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
   
    <div className="space-y-2 bg-white h-screen w-[70%] ">
      <h2 className="font-bold text-2xl p-4 text-center" > Select Contact</h2>
          {users
            ?.filter((user: any) => user._id !== authUser?._id)
            .map((user: any) => (
              <button
                key={user?._id}
                onClick={() => setSelectedUser(user)}
                className="w-full"
              >
                <div
                  className={`flex w-full items-center p-3 hover:bg-gray-100 rounded-lg cursor-pointer ${
                    selectedUser?._id === user._id ? "bg-gray-100" : ""
                  }`}
                >
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                      <img
                        src={user.profilePic || "/avatar.png"}
                        alt=""
                        className="rounded-full"
                      />
                    </div>
                    {Onlineusers?.includes(user._id) ? (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    ) : (
                      <>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-gray-500 rounded-full border-2 border-white"></div>
                      </>
                    )}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">{user.username}</p>
                    <p className="text-xs text-gray-500">
                      {Onlineusers?.includes(user._id) ? "Online" : "Offline"}
                    </p>
                  </div>
                </div>
              </button>
            ))}
        </div>


  </div>
</div>
    </>
  );
};

export default Sidebar;
