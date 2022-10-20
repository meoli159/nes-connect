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

export const renameCommunity = async (communityId, communityName, dispatch) => {
  const res = await axiosClient.put(`/community/${communityId}`, communityName);
  dispatch(renameCommunitySuccess(res.data));
  dispatch(selectCommunity(res.data));
};

export const deleteCommunity = async (communityId) => {
  const res = await axiosClient.delete(`/community/${communityId}`);
  return res.data;
};

export const communityUserAdd = async (communityId, user) => {
  const res = await axiosClient.post(`/community/${communityId}/user`, user);

  return res.data;
};

export const removeUserFromCommunity = async (communityId, userId) => {
  const res = await axiosClient.delete(
    `/community/${communityId}/user/${userId}`
  );
  return res.data;
};

export const transferCommunityAdmin = async (communityId, userId) => {
  const res = await axiosClient.put(`/community/${communityId}/user`, {
    userId,
  });
  return res.data;
};
