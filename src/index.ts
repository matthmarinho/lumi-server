import express, { Application } from "express";
import dotenv from "dotenv";
import router from "./routes/index";
import cors from "cors";
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(router);
app.use(cors());
app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  next();
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});