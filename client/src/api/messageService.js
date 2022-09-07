import {
  getMessageStart,
  getMessageSuccess,
  sendMessage,
  getMessageFailed,
} from "../redux/messageSlice";

const fetchMessages = async ( groupId, accessToken,dispatch, axiosJWT) => {
  dispatch(getMessageStart());
  try {
    const res = await axiosJWT.get(`api/message/${groupId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  
    dispatch(getMessageSuccess(res.data));
  } catch (error) {
    dispatch(getMessageFailed(error));
  }
};

const sendMessages = async (msg, accessToken,socket, dispatch, axiosJWT) => {
  try {
    const res = await axiosJWT.post(`api/message`,msg, {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
    );
    socket.emit("new message", res);
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
