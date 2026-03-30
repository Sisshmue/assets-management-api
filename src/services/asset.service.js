import {
  createAssets,
  deleteAsset,
  findAsset,
  getAllAssets,
  restoreAsset,
  updateAsset,
} from "../respositories/asset.repository.js";

export const createAssetsService = async (data) => {
  return await createAssets(data);
};

export const getAllAssetsService = async () => {
  return await getAllAssets();
};

export const findAssetService = async (id) => {
  return await findAsset(id);
};

export const updateAssetService = async (id, data) => {
  return await updateAsset(id, data);
};

export const deleteAssetService = async (id) => {
  return await deleteAsset(id);
};

export const restoreAssetService = async (id) => {
  return await restoreAsset(id);
};
