import {
  createAssets,
  deleteAsset,
  findAsset,
  findAssetWithStatus,
  getAllAssets,
  restoreAsset,
  returnAsset,
  updateAsset,
} from "../respositories/asset.repository.js";
import prisma from "../configs/prisma.js";

export const createAssetsService = async (data) => {
  return await createAssets(data);
};

export const getAllAssetsService = async () => {
  return await getAllAssets();
};

export const findAssetService = async (id) => {
  return await findAsset(id);
};


export const findAssetWithStatusService = async(name, status)=>{
  return await findAssetWithStatus(name, status);
}


export const updateAssetService = async (id, data) => {
  return await updateAsset(id, data);
};

export const deleteAssetService = async (id) => {
  return await deleteAsset(id);
};

export const restoreAssetService = async (id) => {
  return await restoreAsset(id);
};

export const assignAssetsService = async (assetId, userId) => {
  return prisma.$transaction(async (tx) => {
    //find asset
    const asset = await tx.asset.findUnique({
      where: { id: assetId },
    });

    const user = await tx.user.findUnique({
      where: { id: userId },
    });

    if (!asset) throw new Error("Asset not found");
    if (!user) throw new Error("User not found");

    if (asset.status !== "AVAILABLE") {
      throw new Error("Asset not available");
    }
    //creat assignment
    await tx.assetAssignment.create({
      data: { assetId, userId },
    });

    //update status
    await tx.asset.update({
      where: { id: assetId },
      data: {
        status: "ASSIGNED",
      },
    });

    await tx.assetHistory.create({
      data: {
        assetId,
        performedBy: userId,
      },
    });
    return { message: "Asset assigned successfully" };
  });
};

export const returnAssetService = async (id)=>{
  return await returnAsset(id);
}
