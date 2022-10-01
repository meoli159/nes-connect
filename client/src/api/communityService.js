import axiosClient from "./createInstance";
import {
  fetchingFail,
  renameCommunitySuccess,
  deleteCommunitySuccess,
  pending,
} from "../redux/community/communitySlice";
import { selectCommunity } from "../redux/messageSlice";

export const getCommunityList = async () => {
  const res = await axiosClient.get(`/community`);
  return res.data;
};

export const createCommunity = async (community) => {
    const res = await axiosClient.post(`/community`, community);
    return res.data


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

const addUserToCommunity = async (communityId, user, accessToken, dispatch) => {
  dispatch(pending());
  try {
    const res = await axiosClient.put(
      `/community/${communityId}/adduser`,
      user,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    dispatch(selectCommunity(res.data));
  } catch (error) {
    dispatch(fetchingFail());
  }
};

const leaveRemoveUserFromCommunity = async () => {};

const chatService = {
  // getCommunityList,
  // createCommunity,
  renameCommunity,
  deleteCommunity,
  addUserToCommunity,
  leaveRemoveUserFromCommunity,
};

export default chatService;
