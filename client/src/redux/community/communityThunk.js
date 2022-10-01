import {getCommunityList as fetchCommunityAPI,
createCommunity as createCommunityAPI,

} from "../../api/communityService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCommunityThunk = createAsyncThunk("community/fetch", async() => {
    return await fetchCommunityAPI()
  
  });

export const createCommunityThunk = createAsyncThunk("community/create",async(community)=>{
    return await  createCommunityAPI(community);
})