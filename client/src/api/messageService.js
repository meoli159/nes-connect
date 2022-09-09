import {
  getMessageStart,
  getMessageSuccess,
  sendMessage,
  getMessageFailed,
} from "../redux/messageSlice";

const fetchMessages = async ( communityId, accessToken,socket,dispatch, axiosJWT) => {
  dispatch(getMessageStart());
  try {
    const res = await axiosJWT.get(`/api/message/${communityId}`, {
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
    socket.on("received-message", res.data);
    socket.emit("send-message", res.data);
    
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
