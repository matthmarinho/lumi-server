// import express, { Application } from "express";
// import dotenv from "dotenv";
// import router from "./routes/index";
// import cors from "cors";
// dotenv.config();

// const app: Application = express();
// const port = process.env.PORT || 8000;

// app.use(express.json());
// app.use(router);
// app.use(cors());

// app.listen(port, () => {
//   console.log(`Server running on port: ${port}`);
// });

const express = require("express");
const app = express();

app.get("/", (_req: any, res: any) => res.send("Express on Vercel"));

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;