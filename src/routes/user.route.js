import { register, login } from "../controllers/user.controller.js";
import { Router } from "express";
import { validate } from "../middlewares/validate.middle.js";
import { loginSchema, registerSchema } from "../validations/user.validation.js";

const router = Router();
router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

export default router;
