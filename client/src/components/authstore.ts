import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { io} from "socket.io-client";
export const useAuthStore: any = create<any>((set: any, get: any) => ({
  // let navigate=useNavigate(),
  authUser: null,
  isCheckingAuth: true,
  Onlineusers: [],
  isLoggingIn: null,
  isUpdatingprofile: false,
  socket: null,
  CheckAuth: async () => {
    try {
      const res = await axios.get("/auth/check");
      set({ authUser: res.data.info });
      get().connectSocket();
    } catch (error) {
      console.log(error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  connectSocket: async () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    console.log("Connecting to socket...");
    const socket = io(`${import.meta.env.VITE_DEV_URL}`, {
      query: { userId: authUser._id },
    });

    socket.connect();

    socket.on("connect", () => {
      console.log("Socket connected");
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    socket.on("getOnlineusers", (userIds) => {
      console.log("Received online users", userIds);
      set({ Onlineusers: userIds });
    });
    set({ socket: socket });
  },
  disconnectSocket: async () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
  Signup: async (data: any) => {
    try {
      const res = await axios.post("/auth/signup", data);
      set({ authUser: res.data });
      console.log(res.data);
      toast.success("Signup Successfully");
      get().connectSocket();
      // navigate("/");
    } catch (error) {
      console.log(error);
      set({ authUser: null });
    } finally {
      set({ isLoggingIn: false });
    }
  },
  Login: async (data: any) => {
    try {
      const res = await axios.post("/auth/login", data);
      set({ authUser: res.data });
      // console.log({heheeh:res.data});
      toast.success("Login Successfully");
      get().connectSocket();
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoggingIn: false });
    }
  },
  Logout: async () => {
    try {
      await axios.post("/auth/logout");
      set({ authUser: null });

      toast.success("Logout Successfully");
    } catch (error: any) {
      toast(error);
    }
  },
  Updateprofile: async (data: any) => {
    set({ isUpdatingprofile: true });
    try {
      await axios.put("/auth/update-profile", data).then((res) => {
        set({ authUser: res.data.updateduser });
      });
    } catch (error) {
      console.log({ errordehkalay: error });
    } finally {
      set({ isUpdatingprofile: false });
      toast.success("Profile Updated Successfully");
    }
  },
}));
