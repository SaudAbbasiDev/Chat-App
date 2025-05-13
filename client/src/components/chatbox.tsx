import { useMsgStore } from "./msgstore";
import { useEffect } from "react";
import Input from "./input";
import { useAuthStore } from "./authstore";

const ChatArea = () => {
  const {
    selectedUser,
    getMessages,
    messages,
    isMessageloading,
    listenMessage,
    unlistenMessage,
  } = useMsgStore();
  // let messageRef = useRef<any>(null);
  const { authUser, Onlineusers } = useAuthStore();
  useEffect(() => {
    getMessages(selectedUser._id);
    listenMessage();
    // messageRef.current.scrollIntoView({ behavior: "smooth" });
    return () => unlistenMessage();
  }, [selectedUser._id, getMessages, listenMessage, unlistenMessage]);

  console.log({ heeeeeeeh: messages });
  if (isMessageloading) return <h1>Loading...</h1>;
  return (
    <div className="flex-1 flex flex-col max-md:w-screen max-h-[93%] overflow-y-hidden bg-white">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center ml-12 space-x-4">
         
          <div className="relative flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-white font-semibold">
              <img
                src={selectedUser.profilePic || "/avatar.png"}
                alt=""
                className="rounded-full object-contain"
              />
            </div>
            <div
              className={`absolute bottom-0 right-0 w-3 h-3${
                Onlineusers.includes(selectedUser?._id)
                  ? "bg-green-500"
                  : "bg-gray-400"
              } rounded-full border-2 border-white`}
            ></div>
          </div>
          <div>
            <h3 className="font-semibold"> {selectedUser?.fullname} </h3>
            <p className="text-xs text-gray-500">
              {Onlineusers.includes(selectedUser?._id) ? "Online" : "Offline"}{" "}
            </p>
          </div>
        </div>
       
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        <div className="space-y-4">
          {/* Date */}
          <div className="text-center text-xs text-gray-500 my-4">
            Today, {new Date().toDateString()}
          </div>

          {/* message AREA */}
          {messages.map((message: any,index:number) => {
            const dateObj = new Date(message?.createdAt || Date.now());
            const formattedTime = dateObj.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            });

            return (
              <div
                key={index}
                className={`chat ${
                  message?.senderId === authUser._id
                    ? "chat-end"
                    : "chat-start"
                } mb-3`}
              >
                <div>
                  <div
                    className={`px-4 py-2 rounded-xl max-w-xs shadow-xl ${
                      message?.senderId === authUser?._id
                        ? "bg-blue-500 text-white rounded-br-none"
                        : "bg-gray-200 text-gray-900 rounded-bl-none"
                    }`}
                  >
                    {/* Image preview */}
                    {message?.image && (
                      <div className="mb-2 rounded-lg overflow-hidden max-w-[200px] max-h-[200px]">
                        <img
                          src={message?.image}
                          alt="Preview"
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}

                    {/* Text */}
                    {message.text && (
                      <p className="whitespace-pre-wrap">{message.text}</p>
                    )}
                  </div>

                  {/* Time (under bubble) */}
                  <p
                    className={`text-[10px] mt-1 text-gray-500 ${
                      message?.senderId === authUser._id
                        ? "text-right"
                        : "text-left"
                    }`}
                  >
                    {formattedTime}
                  </p>
                </div>
              </div>
            );
          })}

          {/* Message Input */}
        </div>
      </div>
      <Input />
    </div>
  );
};

export default ChatArea;
