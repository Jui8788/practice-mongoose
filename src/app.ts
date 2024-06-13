import express, { Request, Response } from "express";
import cors from "cors";
import { MovieRoutes } from "./modules/movies/movie.route";
import { notFound } from "./middleware/notFound";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
const app = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use("/api/movies", MovieRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello SuJu");
});

app.use(notFound);
app.use(globalErrorHandler);

export default app;
