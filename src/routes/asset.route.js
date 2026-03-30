import { Router } from "express";
import * as AssetController from "../controllers/asset.controller.js";
import authMiddleWare from "../middlewares/auth.middle.js";

const route = Router();
route.post("/create", authMiddleWare, AssetController.createAsset);
route.get("/all", authMiddleWare, AssetController.getAllAssets);

export default route;
