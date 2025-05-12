import { Lock, LogIn, UserPen, NotebookPen } from "lucide-react";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useAuthStore } from "../components/authstore";
export default function SignUp() {
   const {Signup}=useAuthStore()
const [formdata, setformdata] = useState({
  fullname: "",
  username: "",
  password: "",
})
  // let navigate = useNavigate();
  const validateform = () => {

    if (!formdata.password || !formdata.username || !formdata.fullname) {
      return false;
    } else return true;
  };
  const handleSubmit = async () => {
    let isValid = validateform();
  if(isValid){
Signup(formdata)
  }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable={true}
        theme="light"
      />
      <div className="flex items-center justify-center min-h-screen bg-indigo-50">
        {/* WhatsApp-like background pattern */}
        <div
          className="absolute inset-0 bg-indigo-50"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23dcfce7' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            opacity: 0.8,
          }}
        />

        {/* Main container */}
        <div className="w-full max-w-4xl bg-white rounded-xl shadow-xl overflow-hidden z-10">
          <div className="flex flex-col md:flex-row-reverse">
            {/* Left side - Image */}
            <div className="md:w-1/2 bg-gradient-to-r from-blue-600 to-indigo-700 p-12 text-white hidden md:flex flex-col justify-center items-center">
              <h2 className="text-3xl font-bold mb-4">Join the Conversation</h2>
              <p className="text-blue-100 mb-6">
                Sign up to connect, chat, and build friendships around the
                globe.
              </p>
              <div className="w-full max-w-sm">
                <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3">
                      <span className="text-black font-bold text-lg">AR</span>
                    </div>
                    <div>
                      <p className="font-medium">Ava Rodriguez</p>
                      <p className="text-xs text-blue-100">Just Joined</p>
                    </div>
                  </div>
                  <p className="text-sm">
                    “Excited to start chatting and meet awesome new people
                    here!”
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - Login form */}
            <div className="md:w-1/2 py-12 px-8 md:px-12">
              <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-gray-800">Sign Up</h1>
                <p className="text-gray-500 mt-2">
                  Enter your credentials to create a new account
                </p>
              </div>

              <div className="space-y-6">
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                 <NotebookPen size={18} />
                  </div>
                  <input
                    value={formdata.fullname}
                    onChange={(e) => setformdata({ ...formdata, fullname: e.target.value })}
                    required={true}
                    type="name"
                    className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="fullname"
                  />
                </div>

                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                   <UserPen size={18}  />
                  </div>
                  <input
                    value={formdata.username}
                    onChange={(e) => setformdata({ ...formdata, username: e.target.value })}
                    required={true}
                    type="text"
                    className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="username"
                  />
                </div>

                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Lock size={18} />
                  </div>
                  <input
                    value={formdata.password}
                    onChange={(e) => setformdata({ ...formdata, password: e.target.value })}
                    required={true}
                    type="password"
                    className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Password"
                  />
                </div>

                <div className="flex items-center justify-between"></div>
                <button
                  onClick={handleSubmit}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center transition duration-300"
                >
                  <LogIn size={18} className="mr-2" />
                  Sign Up
                </button>
              </div>

              <p className="text-center text-gray-600 mt-8">
                Already have an account?
                <a href="/login" className="text-indigo-600 font-medium ml-1">
                  Log In
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
