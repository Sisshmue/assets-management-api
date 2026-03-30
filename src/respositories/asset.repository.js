import prisma from "../configs/prisma.js";

export const createAssets = (data)=>{
    return prisma.asset.create({data})
}

export const getAllAssets = ()=>{
    return prisma.asset.findMany();
}
