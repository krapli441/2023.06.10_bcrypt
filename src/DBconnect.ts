import dotenv from "dotenv";
import mysql from "mysql2";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const connection = mysql.createConnection({
  host: process.env.mysqlAdmin_Host,
  user: process.env.mysqlAdmin_User,
  password: process.env.mysqlAdmin_Password,
  database: process.env.mysqlAdmin_Database,
});

export default connection;
