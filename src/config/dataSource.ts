import { DataSource } from "typeorm";
import { Movie } from "../entities/MovieEntity";

const { DB_DATABASE } = process.env;

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: DB_DATABASE || "database.db",
  synchronize: true,
  logging: true,
  entities: [Movie],
  subscribers: [],
  migrations: ["../migrations/*.{ts,js}"],
  // ssl: true,
  // extra: {
  //   ssl: {
  //     rejectUnauthorized: false,
  //   },
  // },
});
