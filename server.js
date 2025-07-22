import express from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const port = process.env.PORT || 5100;

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.post("/", (req, res) => {
  console.log(req);
  res.json({ message: "Data Recieved", data: req.body });
});

app.listen(port, () => {
  console.log(`server is running on port ${port} `);
});
