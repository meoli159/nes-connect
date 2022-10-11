import axiosClient from "./createInstance";
import { sendMessage } from "../redux/message/messageSlice";

export const fetchMessages = async (communityId) => {
  const res = await axiosClient.get(`/message/${communityId}`);

  return res.data;
};

const sendMessages = async (msg, accessToken, socket, dispatch) => {
  const res = await axiosClient.post(`/message`, msg, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  socket.emit("onMessage", res.data);
  dispatch(sendMessage(res.data));
};
const messageService = {
  // fetchMessages,
  sendMessages,
};

export default messageService;
