import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool(
  process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
      }
    : {
        user: process.env.PG_USER,
        host: "localhost",
        database: "ToDoList",
        password: process.env.PG_PASSWORD,
        port: 5432,
      }
);
