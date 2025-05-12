import { LogOut, MessageSquare, Settings } from "lucide-react";
import { useAuthStore } from "./authstore";

const Navbar = () => {
  const { Logout, authUser } = useAuthStore();

  return (
    <>
      <main className="flex justify-between px-8 pt-5 bg-indigo-50">
        <div className="flex gap-3 items-center select-none">
          <div className="flex items-center justify-center gap-8">
            <a
              href="/"
              className="flex  items-center gap-2 hover:opacity-80 transition-all"
            >
              <MessageSquare className="w-6 h-6 animate-bounce text-primary" />
              <h1 className="text-lg pb-1 font-bold">Chatty</h1>
            </a>
          </div>
        </div>

        <div className="pb-3">
          {authUser && (
            <div className="flex md:gap-10 gap-3 max-md:flex-col ">
              <a
                href="/profile"
                className="flex justify-center gap-2 py-1 scale-90 bg-gray-200 px-2  rounded-md"
              >
                <Settings />
                Settings
              </a>

              <button
                onClick={Logout}
                className="cursor-pointer justify-center scale-90 flex gap-2 px-2 py-1 bg-gray-200 "
              >
                <LogOut /> Log Out
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Navbar;
