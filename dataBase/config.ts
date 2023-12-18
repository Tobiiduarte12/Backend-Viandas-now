import mongoose from "mongoose";

export const dbConnection = async (): Promise<void> => {
  try {
    const dbURL = process.env.DB_URL;
    if (!dbURL) {
      console.log(Error);
      throw new Error("URL no encontrada en la base de datos");
    }
    await mongoose.connect(dbURL);
  } catch (error) {
    console.log(error);
    throw new Error("Error al iniciar la base de datos");
  }
};
