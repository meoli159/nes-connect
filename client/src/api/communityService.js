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

const deleteCommunity = async (communityId, accessToken, dispatch) => {
  try {
    await axiosClient.delete(`/community/${communityId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(deleteCommunitySuccess(communityId));
    dispatch(selectCommunity(communityId));
    getCommunityList(accessToken, dispatch);
  } catch (error) {
    dispatch(fetchingFail());
  }
};

export const CommunityUserAdd = async (communityId, user) => {
  const res = await axiosClient.post(`/community/${communityId}/user`, user);
 
  return res.data
};

const leaveRemoveUserFromCommunity = async () => {};

const chatService = {
  renameCommunity,
  deleteCommunity,
  leaveRemoveUserFromCommunity,
};

export default chatService;
