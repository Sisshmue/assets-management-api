import { Router } from "express";
import * as AssetController from "../controllers/asset.controller.js";
import authMiddleWare from "../middlewares/auth.middleware.js";
import checkRole from "../middlewares/role.middleware.js";

const route = Router();
route.post(
  "/create",
  authMiddleWare,
  checkRole("ADMIN"),
  AssetController.createAsset,
);
route.get(
  "/all",
  authMiddleWare,
  checkRole("ADMIN", "EMPLOYEE"),
  AssetController.getAllAssets,
);

export default route;
