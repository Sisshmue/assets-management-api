import expess from "express";
import authRoutes from "./src/routes/user.route.js";

const app = expess();

app.use(expess.json());
app.use("/auth", authRoutes);

export default app;

