import prisma from "../configs/prisma.js";

export const createAssets = (data) => {
  return prisma.asset.create({ data });
};

export const getAllAssets = () => {
  return prisma.asset.findMany({
    where: { isDeleted: false },
  });
};

export const findAsset = (id) => {
  return prisma.asset.findUnique({
    where: { id },
  });
};

export const updateAsset = (id, data) => {
  return prisma.asset.update({
    data,
    where: { id },
  });
};

export const deleteAsset = (id) => {
  return prisma.asset.update({
    data: {
      isDeleted: true,
    },
    where: { id },
  });
};

export const restoreAsset = (id) => {
  return prisma.asset.update({
    data: {
      isDeleted: false,
    },
    where: { id },
  });
};
