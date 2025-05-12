import axios from "axios";
import { create } from "zustand";
import { useAuthStore } from "./authstore";

export const useMsgStore = create<any>((set: any, get: any) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUserloading: false,

  isMessageloading: false,
  getUsers: async () => {
    set({ isUserloading: true });
    try {
      const res: any = await axios.get("/msg/getuser");
      set({ users: res.data });
      console.log({ usssssser: res.data });
      set({ isUserloading: false });
    } catch (error) {
      console.warn({ ErrorDekhLay: error });
    } finally {
      set({ isUserloading: false });
    }
  },
  getMessages: async (userid: any) => {
    set({ isMessageloading: true });
    try {
      let res = await axios.get(`/msg/${userid}`);
      set({ messages: res.data });
    } catch (error) {
      console.warn({ ErrorDekhLay: error });
    } finally {
      set({ isMessageloading: false });
    }
  },
  setSelectedUser: (user: any) => set({ selectedUser: user }),
  sendMessage: async (msg: any) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axios.post(`/msg/send/${selectedUser._id}`, msg);
      // Directly update state without waiting for backend response (optimistic update)
      set({ messages: [...messages, res.data.newMessages] });
    } catch (error) {
      console.log(error);
    }
  },
  listenMessage: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;
    const socket = useAuthStore.getState().socket;
    socket.on("newMessage", (data: any) => {
      set({ messages: [...get().messages, data] });
    });
  },
  unlistenMessage: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },
}));
