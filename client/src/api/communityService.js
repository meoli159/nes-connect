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
  deleteCommunitySuccess,
} from "../redux/communitySlice";
import { selectCommunity } from "../redux/messageSlice";

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

const renameCommunity = async (communityId, communityName,accessToken, dispatch) => {
  try {
    const res = await axios.put(`/api/community/${communityId}` ,communityName,{
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(renameCommunitySuccess(res.data));
    dispatch(selectCommunity(res.data));
    
  } catch (error) {
    dispatch(fetchingFail());
  }
};

const deleteCommunity = async (communityId,accessToken,dispatch) => {
  try {
    await axios.delete(`/api/community/${communityId}`,{
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    dispatch(deleteCommunitySuccess(communityId))
    dispatch(selectCommunity(communityId));
    getCommunityList(accessToken,dispatch)
  } catch (error) {
    dispatch(fetchingFail())
  }
};

const generateLinkInvite = async(communityId,userId)=>{
const res = await axios.get(`/api/community/`,{
  params: {
    communityId,
    userId
  }
})
console.log(res)
}

const addUserToCommunity = async () => {};

const leaveRemoveUserFromCommunity = async () => {};

const chatService = {
  getCommunityList,
  createCommunity,
  renameCommunity,
  deleteCommunity,
  generateLinkInvite,
  addUserToCommunity,
  leaveRemoveUserFromCommunity,
};

export default chatService;
