import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserByEmail, creatUser } from "../respositories/user.repository.js";

export const registerUser = async (data) => {
  const existingUser = await findUserByEmail(data.email);

  if (existingUser) {
    throw new Error("Email already register");
  }

  const hashpassword = await bcrypt.hash(data.password, 10);

  const user = await creatUser({
    ...data,
    password: hashpassword,
  });

  return user;
};

export const loginUser = async (data) => {
  const existingUser = await findUserByEmail(data.email);
  if (!existingUser) {
    throw new Error("User does not exist! Try creating new one");
  }
  const isMatch = await bcrypt.compare(data.password, existingUser.password);
  if (!isMatch) {
    throw new Error("Invalid Credentials");
  }

  const token = jwt.sign(
    {
      userId: existingUser.id,
      role: existingUser.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  return { existingUser, token };
};

