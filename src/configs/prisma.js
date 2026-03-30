import dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from "../../generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";

console.log(process.env.DATABASE_URL);


const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const prisma = new PrismaClient({adapter});

export default prisma;
