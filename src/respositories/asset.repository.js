import prisma from "../configs/prisma.js";

export const createAssets = (data) => {
  if (Array.isArray(data)) {
    return prisma.asset.createManyAndReturn({ data, skipDuplicates: true });
  }
  return prisma.asset.create({ data });
};

export const getAllAssets = (page, limit) => {
  return prisma.asset.findMany({
    where: { isDeleted: false },
    skip: (page - 1) * limit,
    take: limit,
  });
};

export const findAsset = (id) => {
  return prisma.asset.findUnique({
    where: { id },
  });
};

export const findAssetWithStatus = (name, status, page, limit) => {
  return prisma.asset.findMany({
    where: {
      isDeleted: false,
      ...(name && { name: { contains: name, mode: "insensitive" } }),
      ...(status && { status }),
    },
    skip: (page - 1) * limit,
    take: limit,
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
