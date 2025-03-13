import AppDataSource from "../datasource";

export const connectDB = async () => {
  const dataSource = await AppDataSource;
  if (!dataSource.isInitialized) {
    await dataSource.initialize();
    console.log("Database Conneced Succesfully");
  }

  try {
    await dataSource.runMigrations();
  } catch (err) {
    console.log("theres an error coneecting database", err);
  }
};
