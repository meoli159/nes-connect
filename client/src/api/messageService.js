import axiosClient from "./createInstance";
import { sendMessage } from "../redux/message/messageSlice";

export const fetchMessages = async (communityId) => {
  const res = await axiosClient.get(`/message/${communityId}`);

  return res.data;
};

const sendMessages = async (msg, socket, dispatch) => {
  const res = await axiosClient.post(`/message`, msg);
  socket.emit("onMessage", res.data);
  dispatch(sendMessage(res.data));
};
const messageService = {
  sendMessages,
};

export default messageService;
