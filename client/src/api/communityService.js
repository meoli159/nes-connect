import axiosClient from "./createInstance";
import {
  fetchingFail,
  renameCommunitySuccess,
  deleteCommunitySuccess,
} from "../redux/community/communitySlice";
import { selectCommunity } from "../redux/message/messageSlice";

export const getCommunityList = async () => {
  const res = await axiosClient.get(`/community`);
  return res.data;
};

export const createCommunity = async (community) => {
  const res = await axiosClient.post(`/community`, community);
  return res.data;
};

const renameCommunity = async (
  communityId,
  communityName,
  accessToken,
  dispatch
) => {
  try {
    const res = await axiosClient.put(
      `/community/${communityId}`,
      communityName,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(renameCommunitySuccess(res.data));
    dispatch(selectCommunity(res.data));
  } catch (error) {
    dispatch(fetchingFail());
  }
};

export const deleteCommunity = async (communityId, dispatch) => {
  try {
    await axiosClient.delete(`/community/${communityId}`);
    dispatch(deleteCommunitySuccess(communityId));
    dispatch(selectCommunity(communityId));
  } catch (error) {
    dispatch(fetchingFail());
  }
};

export const communityUserAdd = async (communityId, user) => {
  const res = await axiosClient.post(`/community/${communityId}/user`, user);

  return res.data;
};

export const removeUserFromCommunity = async (communityId, userId) => {
  try {
    const res = await axiosClient.delete(`/community/${communityId}/user/${userId}`);
  } catch (error) {
    console.log(error);
 
  }
};

export const transferCommunityAdmin = async (
  communityId,
  newCommunityAdmin
) => {
  const res = await axiosClient.put(
    `/community/${communityId}/user`,
    newCommunityAdmin
  );
  return res.data;
};
const chatService = {
  renameCommunity,
};

export default chatService;
