import prisma from "./src/configs/prisma.js";

async function test() {
    const users = await prisma.user.findMany();
    console.log(users);
}

test();