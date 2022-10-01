import axiosClient from "./createInstance";
import {
  getMessageStart,
  getMessageSuccess,
  sendMessage,
  getMessageFailed,
} from "../redux/messageSlice";

const fetchMessages = async ( communityId, accessToken,socket,dispatch) => {
  dispatch(getMessageStart());
  try {
    const res = await axiosClient.get(`/message/${communityId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    socket.emit("join chat",communityId);
    dispatch(getMessageSuccess(res.data));
  } catch (error) {
    dispatch(getMessageFailed(error));
  }
};

const sendMessages = async (msg, accessToken,socket, dispatch) => {
  try {
    const res = await axiosClient.post(`/message`,msg, {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
    );
    socket.emit("new message", res.data);
    dispatch(sendMessage(res.data));
  } catch (error) {
    dispatch(getMessageFailed(error));
  }
};
const messageService = {
  fetchMessages,
  sendMessages,
};

export default messageService;
