import { AppDataSource } from "../ormconfig";

export const connectDB = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database Conneced Succesfully");
  } catch (err) {
    console.log("theres an error coneecting database", err);
  }
};
