import axios from "axios";
import { create } from "zustand";
import { useAuthStore } from "./authstore";

export const useMsgStore:any = create<any>((set: any, get: any) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUserloading: false,
  isMessageloading: false,
  getUsers: async () => {
    set({ isUserloading: true });
    try {
      const res = await axios.get("/msg/getuser");
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
      const res = await axios.get(`/msg/${userid}`);
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
      const res = await axios.post(`/msg/send/${selectedUser?._id}`, msg);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      console.log(error);
    }
  },
  listenMessage: () => {
    const { selectedUser } = get();
    const socket = useAuthStore.getState().socket;
    socket.on("newMessage", (data: any) => {
      const isMessageSentFromSelectedUser = data.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;
      console.log("Received new message", data);

      set({ messages: [...get().messages, data] });
    });
  },
  unlistenMessage: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },
}));
