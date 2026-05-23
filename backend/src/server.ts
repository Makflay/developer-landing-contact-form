import cors from "cors";
import express from "express";
import { router } from "./routes/index";
import { env } from "./config/env.config";

const app = express();

const PORT = env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is running",
  });
});

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
