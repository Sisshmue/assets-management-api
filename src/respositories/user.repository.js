import prisma from "../configs/prisma.js";

export const creatUser = (data) => {
  return prisma.user.create({ data });
};

export const findUserByEmail = (email) => {
  return prisma.user.findUnique({ where: { email } });
};

