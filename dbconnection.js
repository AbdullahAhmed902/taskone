import { MongoClient } from "mongodb";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "../src/.env") });
const connectionString = process.env.url || "";
const client = new MongoClient(connectionString);
let conn;
try {
  conn = await client.connect();
} catch (e) {
  console.error(e);
}
let db = conn.db("task");

export default db;
