import mongoose from "mongoose";
import config from "./config.js";
import express from "express";
import authRoute from "./routes/authRoute.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

mongoose
    .connect("mongodb://127.0.0.1:27017/Infloso")
    .then(() => {
        console.log("Connection Open LOCAL");
    })
    .catch((e) => {
        console.log("ERROR");
    });

app.listen(config.port, () => {
    console.log(`Listening on Port ${config.port}`);
});

app.use("/auth", authRoute);
