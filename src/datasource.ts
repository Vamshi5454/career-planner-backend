import { DataSource } from "typeorm";
// import User from "./entities/User";
import Resume from "./entities/Resume";
import dotenv from "dotenv";

dotenv.config();

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST || "localhost",
  port: parseInt(process.env.DATABASE_PORT || "5432"),
  username: process.env.DATABASE_USER, // Replace with your PostgreSQL username
  password: process.env.DATABASE_PASSWORD, // Replace with your PostgreSQL password
  database: process.env.DATABASE_NAME, // Replace with your database name
  synchronize: false, // Set to true only in development
  entities: ["src/entities/*.ts"], // Your TypeORM entities
  migrations: ["src/migrations/*.ts"],
});

export default AppDataSource;
