import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  findUserByEmail,
  creatUser,
} from "../respositories/user.repository.js";

const generateToken = (user) => {
  const token = jwt.sign(
    {
      userId: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );
  return token;
};

export const registerUser = async (data) => {
  const existingUser = await findUserByEmail(data.email);

  if (existingUser) {
    throw new Error("Email already register");
  }

  const hashpassword = await bcrypt.hash(data.password, 10);

  const createdUser = await creatUser({
    ...data,
    password: hashpassword,
  });

  const token = generateToken(createdUser);

  return {
    user: {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      role: createdUser.role,
      position: createdUser.position,
      createdAt: createdUser.createdAt,
      assignments: createdUser.assignments,
    },
    token,
  };
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

  const token = generateToken(existingUser);

  return {
    user: {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
      role: existingUser.role,
      position: existingUser.position,
      createdAt: existingUser.createdAt,
      assignments: existingUser.assignments,
    },
    token,
  };
};
