import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import eventrouter from "./src/modules/eventmodule/event.router.js";
import { globalerr } from "./src/services/asyncHandler.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "./src/.env") });
const app = express();
const port = process.env.port;
const baseurl = process.env.BASEURL;
app.use(express.json());
app.use(`${baseurl}/eventmodule`, eventrouter);
app.use("*", (req, res) => {
  res.send("In-valid Routing Plz check url  or  method");
});
app.use(globalerr);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
