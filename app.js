import expess from "express";
import authRoutes from "./src/routes/user.route.js";
import assetRoutes from "./src/routes/asset.route.js"

const app = expess();

app.use(expess.json());
app.use("/auth", authRoutes);
app.use('/api/assets', assetRoutes)

export default app;

