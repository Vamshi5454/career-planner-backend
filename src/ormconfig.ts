// import { DataSource } from "typeorm";
// import { User } from "./entities/User";

// export const AppDataSource = new DataSource({
//   type: "mysql",
//   url: process.env.DATABASE_URL,
//   entities: [User],
//   synchronize: true, // Set to false in production
//   logging: true,
// });

// import { DataSource } from "typeorm";
// import { User } from "./entities/User";
// import dotenv from "dotenv";

// dotenv.config();

// export const AppDataSource = new DataSource({
//   type: "mysql",
//   host: "localhost",
//   port: parseInt(process.env.DATABASE_HOST || "3306"),
//   username: process.env.DATABASE_USER, // Replace with your MySQL username
//   password: process.env.DATABASE_PASSWORD, // Replace with your MySQL password
//   database: process.env.DATABASE_NAME, // Replace with your database name
//   synchronize: true, // Set to true only in development
//   logging: true,
//   entities: [User], // Your TypeORM entities
// });

import { DataSource } from "typeorm";
import { User } from "./entities/User";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST || "localhost",
  port: parseInt(process.env.DATABASE_PORT || "5432"),
  username: process.env.DATABASE_USER, // Replace with your PostgreSQL username
  password: process.env.DATABASE_PASSWORD, // Replace with your PostgreSQL password
  database: process.env.DATABASE_NAME, // Replace with your database name
  synchronize: true, // Set to true only in development
  logging: true,
  entities: [User], // Your TypeORM entities
});
