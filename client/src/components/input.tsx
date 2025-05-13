import {  Paperclip, Send } from "lucide-react";
import { useRef, useState } from "react";
import { useMsgStore } from "./msgstore";
import { toast } from "react-toastify";

const Input = () => {
  const [Text, setText] = useState("");
  const [imagePre, setImagepre] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement | null>(null);
  const { sendMessage } = useMsgStore();
  console.log(Text);
  const handleImagechange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagepre(reader.result as string);
    };
  };
  const sendMsg = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await sendMessage({ text: Text.trim(), image: imagePre });
      setText("");
      setImagepre(null);
    } catch (error: any) {
      console.log(error);
      toast(error);
    }
  };
  const removeImg = () => {
    setImagepre(null);
  };

  return (
    <>
      <div className="p-3 border-t border-gray-200">
        {imagePre && (
          <>
            <button onClick={removeImg}>X</button>
            <div className="h-20 w-20 rounded-lg flex items-center justify-center">
              <img src={imagePre} alt="" className=" " />
            </div>
          </>
        )}

        <form
          className="flex items-center bg-gray-50 rounded-full px-4 py-2"
          onSubmit={sendMsg}
        >
          <label className="text-gray-500 hover:text-gray-700 hover:bg-gray-300  rounded-full p-2 cursor-pointer duration-500 mr-2">
            <input
              type="file"
              ref={fileInput}
              onChange={handleImagechange}
              className="hidden"
            />
            <Paperclip size={20} />
          </label>
          <input
            onChange={(e) => setText(e.target.value)}
            value={Text}
            placeholder="Type a message"
            className="flex-1 bg-transparent border-none focus:outline-none text-gray-700 placeholder-gray-400"
          />
          <div className="flex items-center space-x-2 ml-2">
            <button
              className="bg-indigo-500 text-white rounded-full p-2 hover:bg-indigo-600 duration-500"
              disabled={!Text.trim() && !imagePre} // Disable button if both Text and imagePre are empty}
            >
              <Send size={18} />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Input;
