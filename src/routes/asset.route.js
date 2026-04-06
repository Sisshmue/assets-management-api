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

route.get(
  "/find/:id",
  authMiddleWare,
  checkRole("ADMIN"),
  AssetController.findAsset,
);

route.get(
  "/find",
  authMiddleWare,
  checkRole("ADMIN"),
  AssetController.findAssetWithKeyword,
);

route.post(
  "/update/:id",
  authMiddleWare,
  checkRole("ADMIN"),
  AssetController.updateAsset,
);

route.delete(
  "/delete/:id",
  authMiddleWare,
  checkRole("ADMIN"),
  AssetController.deleteAsset,
);

route.get(
  "/restore/:id",
  authMiddleWare,
  checkRole("ADMIN"),
  AssetController.restoreAsset,
);

route.post(
  "/assign",
  authMiddleWare,
  checkRole("ADMIN"),
  AssetController.assignAsset,
);

route.post("/return", authMiddleWare, AssetController.returnAsset);

export default route;
