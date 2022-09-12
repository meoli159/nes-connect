import axios from "axios";
import {
  getCommunityListStart,
  getCommunityListSuccess,
  getCommunityListFailed,
  createStart,
  createSuccess,
  createFails,
  fetchingFail,
  renameCommunitySuccess,
} from "../redux/communitySlice";

const getCommunityList = async (accessToken, dispatch) => {
  dispatch(getCommunityListStart());
  try {
    const res = await axios.get(`/api/community`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(getCommunityListSuccess(res.data));
  } catch (error) {
    dispatch(getCommunityListFailed());
  }
};

const createCommunity = async (community, accessToken, dispatch, navigate) => {
  dispatch(createStart());
  try {
    const res = await axios.post(`/api/community`, community, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(createSuccess(res.data));
    navigate("/app");
  } catch (error) {
    dispatch(createFails());
  }
};

const renameCommunity = async (community, accessToken, dispatch) => {
  try {
    const res = await axios.put(`/api/community`, community, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(renameCommunitySuccess(res.data));
  } catch (error) {
    dispatch(fetchingFail());
  }
};

const deleteCommunity = async () => {};

const addUserToCommunity = async () => {};

const leaveRemoveUserFromCommunity = async () => {};

const chatService = {
  getCommunityList,
  createCommunity,
  renameCommunity,
  deleteCommunity,
  addUserToCommunity,
  leaveRemoveUserFromCommunity,
};

export default chatService;
