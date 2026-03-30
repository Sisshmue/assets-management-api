import { createAssets, getAllAssets } from "../respositories/asset.repository.js";

export const createAssetsService = async(data)=>{
   return await createAssets(data);
}

export const getAllAssetsService = async()=>{
    return await getAllAssets();
}