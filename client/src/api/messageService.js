import axios from "axios";
import {
    getMessageStart,
    getMessageSuccess,
    getMessageFailed,
  } from "../redux/messageSlice";

  const getMessages = async (accessToken, dispatch, axiosJWT) => {
    dispatch(getMessageStart());
    try {
      const res = await axiosJWT.get(`api/message/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      dispatch(getMessageSuccess(res.data));
    } catch (error) {
      dispatch(getMessageFailed());
    }
  };

  const messageService = {
    getMessages,
  };
  
  export default messageService;