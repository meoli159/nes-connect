import {
  getMessageStart,
  getMessageSuccess,
  sendMessage,
  getMessageFailed,
} from "../redux/messageSlice";

const fetchMessages = async (accessToken, dispatch, id, socket, axiosJWT) => {
  dispatch(getMessageStart());
  try {
    const res = await axiosJWT.get(`api/message/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    socket.emit("join chat", id);
    dispatch(getMessageSuccess(res.data));
  } catch (error) {
    dispatch(getMessageFailed(error));
  }
};

const sendMessages = async (msg, accessToken, dispatch, socket, axiosJWT) => {
  try {
    const res = await axiosJWT.post(`api/message`,msg, {
      headers: { Authorization: `Bearer ${accessToken}` },
      
    },
    );
    socket.emit("new message", res.data);
    dispatch(sendMessage(res.data));
  } catch (error) {
    dispatch(getMessageFailed(error));
    console.log(msg);
  }
};
const messageService = {
  fetchMessages,
  sendMessages,
};

export default messageService;
