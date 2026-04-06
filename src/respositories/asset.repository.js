import prisma from "../configs/prisma.js";

export const createAssets = (data) => {
  if (Array.isArray(data)) {
    return prisma.asset.createManyAndReturn({ data, skipDuplicates: true });
  }
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

export const findAssetWithStatus = (name, status) => {
  return prisma.asset.findMany({
    where: {
      ...(name && { name: { contains: name, mode: "insensitive" } }),
      ...(status && { status }),
    },
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

export const returnAsset = (id) => {
  return prisma.asset.update({
    where: { id },
    data: {
      status: "PENDING",
    },
  });
};
