import * as AssetServices from "../services/asset.service.js";

export const createAsset = async (req, res) => {
  try {
    await AssetServices.createAssetsService(req.body);
    res.status(201).json({ message: "Assets created successfullt" });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const getAllAssets = async (req, res) => {
  try {
     const page = Number(req.query.page) || 1;
    const limit =Number( req.query.limit) || 10;
    const allAssets = await AssetServices.getAllAssetsService(page, limit);
    res.status(200).json(allAssets);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const findAsset = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const asset = await AssetServices.findAssetService(id);
    res.status(200).json(asset);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const findAssetWithKeyword = async (req, res) => {
  try {
    const name = req.body.name;
    const status = req.body.status;
    const page = Number(req.body.page) || 1;
    const limit =Number( req.body.limit) || 10;
    const assets = await AssetServices.findAssetWithStatusService(name, status, page, limit);
    res.status(200).json({
      assets,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const updateAsset = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const existingItem = await AssetServices.findAssetService(id);
    if (!existingItem) {
      return res.status(400).json({
        message: "No Item found",
      });
    }
    const updatedAsset = await AssetServices.updateAssetService(id, req.body);
    res.status(200).json({
      asset: updatedAsset,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const deleteAsset = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const existingItem = await AssetServices.findAssetService(id);
    if (!existingItem) {
      return res.status(400).json({
        message: "No Item found",
      });
    }
    await AssetServices.deleteAssetService(id);
    res.status(200).json({
      message: "Asset deleted successfully.",
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const restoreAsset = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const existingItem = await AssetServices.findAssetService(id);
    if (!existingItem) {
      return res.status(400).json({
        message: "No Item found",
      });
    }
    if (!existingItem.isDeleted) {
      return res.status(400).json({
        message: "Item is already in the list!",
      });
    }
    const restoredItem = await AssetServices.restoreAssetService(id);
    res.status(200).json({
      asset: restoredItem,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const assignAsset = async (req, res) => {
  try {
    const assetId = Number(req.body.assetId);
    const userId = Number(req.body.userId);
    const result = await AssetServices.assignAssetsService(assetId, userId);
    res.status(200).json({
      message: result.message,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const returnAsset = async (req, res) => {
  try {
    const assetId = Number(req.body.assetId);
    const userId = Number(req.body.userId)
    await AssetServices.returnAssetService(userId, assetId);
    res.status(200).json({
      message: "Asset returned successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
