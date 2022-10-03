import axiosClient from "./createInstance";
import { sendMessage } from "../redux/messageSlice";

export const fetchMessages = async (communityId) => {
  const res = await axiosClient.get(`/message/${communityId}`);

  return res.data;
};

const sendMessages = async (msg, accessToken, socket, dispatch) => {
  const res = await axiosClient.post(`/message`, msg, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  socket.emit("new message", res.data);
  dispatch(sendMessage(res.data));
};
const messageService = {
  // fetchMessages,
  sendMessages,
};

export default messageService;
