import {
  createAssets,
  deleteAsset,
  findAsset,
  findAssetWithStatus,
  getAllAssets,
  restoreAsset,
  updateAsset,
} from "../respositories/asset.repository.js";
import prisma from "../configs/prisma.js";
import { AssetStatus } from "../../generated/prisma/client.ts";

export const createAssetsService = async (data) => {
  return await createAssets(data);
};

export const getAllAssetsService = async (page, limit) => {
  return await getAllAssets(page, limit);
};

export const findAssetService = async (id) => {
  return await findAsset(id);
};

export const findAssetWithStatusService = async (name, status, page, limit) => {
  return await findAssetWithStatus(name, status, page, limit);
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

export const assignAssetsService = async (assetId, userId) => {
  return prisma.$transaction(async (tx) => {
    //find asset
    const asset = await tx.asset.findUnique({
      where: { id: assetId, isDeleted: false },
    });

    const user = await tx.user.findUnique({
      where: { id: userId },
    });

    if (!asset) throw new Error("Asset not found");
    if (!user) throw new Error("User not found");

    if (asset.status !== AssetStatus.AVAILABLE) {
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
        status: AssetStatus.ASSIGNED,
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

export const returnAssetService = async (userId, assetId) => {
  return prisma.$transaction(async (tx) => {
    const assignment = await tx.assetAssignment.findFirst({
      where: {
        assetId,
        userId,
        returnAt: null,
      },
    });

    if (!assignment) {
      throw new Error("No Active Assets Assignment");
    }

    await tx.assetAssignment.update({
      where: {
        id: assignment.id,
      },
      data: {
        returnAt: new Date(),
      },
    });

    await tx.asset.update({
      where: {
        id: assetId,
      },
      data: {
        status: "PENDING",
      },
    });

    await tx.assetHistory.create({
      data: {
        assetId,
        performedBy: userId,
        returnAt: new Date(),
      },
    });
    return { message: "Asset returned successfully" };
  });
};
