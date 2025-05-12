import { Mail, Lock, LogIn } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../components/authstore";

export default function Login() {
  const [formdata, setformdata] = useState({ username: "", password: "" });
  const validateform = () => {
    if (!formdata.password || !formdata.username) {
      return false;
    } else return true;
  };
  const { Login } = useAuthStore();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const isValid = validateform();
    if (!isValid) {
      alert("Please fill in both fields."); // or better: set error state
      return;
    }
    Login(formdata);
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-indigo-100 h-screen w-screen">
      {/* WhatsApp-like background pattern */}
      {/* Main container */}
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-xl overflow-hidden z-10">
        <div className="flex flex-col md:flex-row">
          {/* Left side - Image */}
          <div className="md:w-1/2 bg-gradient-to-r from-indigo-600 to-indigo-700 p-12 text-white hidden md:flex flex-col justify-center items-center">
            <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
            <p className="text-indigo-100 mb-6">
              Log in to connect with your friends and family
            </p>
            <div className="w-full max-w-sm">
              <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3">
                    <span className="text-black font-bold text-lg">JD</span>
                  </div>
                  <div>
                    <p className="font-medium">John Doe</p>
                    <p className="text-xs text-indigo-100">Online</p>
                  </div>
                </div>
                <p className="text-sm">
                  Hey! Glad to see you back. Don't forget about our meeting
                  later today!
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Login form */}
          <div className="md:w-1/2 py-12 px-8 md:px-12">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold text-gray-800">Log In</h1>
              <p className="text-gray-500 mt-2">
                Enter your credentials to access your account
              </p>
            </div>
<form action="" onSubmit={handleSubmit}>


            <div className="space-y-6">
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Mail size={18} />
                </div>
                <input
                  onChange={(e) =>
                    setformdata({ ...formdata, username: e.target.value })
                  }
                  value={formdata.username}
                  type="username"
                  className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Username"
                />
              </div>

              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Lock size={18} />
                </div>
                <input
                  onChange={(e) =>
                    setformdata({ ...formdata, password: e.target.value })
                  }
                  value={formdata.password}
                  type="password"
                  className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Password"
                />
              </div>

              <div className="flex items-center justify-between">
               
               
              </div>

              <button 
                onClick={handleSubmit}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center transition duration-300"
              >
                <LogIn size={18} className="mr-2" />
                Log In
              </button>
            </div>
            </form>
            <p className="text-center text-gray-600 mt-8">
              Don't have an account?
              <a href="/signup" className="text-indigo-600 font-medium ml-1">
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
