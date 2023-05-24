import mysql from "mysql2";
import { config } from "dotenv";
config();
const db = mysql.createConnection({
  host: process.env.NOSQL_HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});
db.connect((err) => {
  if (err) throw err;
  console.log("Connection created..!!");
});
export default db;
