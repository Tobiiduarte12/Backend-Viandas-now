import express, { Express } from "express";
import authRoutes from "../routes/auth";
import { dbConnection } from "../dataBase/config";
import orderRoutes from "../routes/orders";
import issuesRoutes from "../routes/issues";
import cors from "cors";

export class Server {
  app: Express;
  port: string | number | undefined;
  authPath: string;
  orderPath: string;
  issuesPath: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.authPath = "/auth";
    this.orderPath = "/orders";
    this.issuesPath = "/issues";

    this.conectarDB();
    this.middleware();
    this.routes();
  }

  async conectarDB(): Promise<void> {
    await dbConnection();
  }

  middleware(): void {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
      next();
    });
  }

  routes(): void {
    this.app.use(this.authPath, authRoutes);
    this.app.use(this.orderPath, orderRoutes);
    this.app.use(this.issuesPath, issuesRoutes);
  }

  listen(): void {
    this.app.listen(this.port, () => {
      console.log(`El servidor está corriendo en el puerto ${this.port}`);
    });
  }
}
