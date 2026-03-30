import * as AssetServices from "../services/asset.service.js";

export const createAsset = async (req, res) => {
  try {
    const asset = await AssetServices.createAssetsService(req.body);
    res.status(201).json(asset);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const getAllAssets = async (req, res) => {
  try {
    const allAssets = await AssetServices.getAllAssetsService();
    res.status(200).json(allAssets);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};
