import axios from "axios";
import {
  getCommunityListStart,
  getCommunityListSuccess,
  getCommunityListFailed,
} from "../redux/communitySlice";

const createChat = async () => {};

const getCommunityList = async (accessToken, dispatch, axiosJWT) => {
    dispatch(getCommunityListStart());
  try {
    const res = await axiosJWT.get(`api/group`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(getCommunityListSuccess(res.data));
  } catch (error) {
    dispatch(getCommunityListFailed());
    
  }
  
};

const chatService = {
  getCommunityList,
  createChat,
};

export default chatService;
