import express, { Request, Response } from "express";
import cors from "cors";
import { MovieRoutes } from "./modules/movies/movie.route";
import { notFound } from "./middleware/notFound";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import { UserRoutes } from "./modules/user/user.route";
import { AuthRoutes } from "./modules/auth/auth.route";
const app = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use("/api/movies", MovieRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/auth", AuthRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello SuJu");
});

app.use(globalErrorHandler);

app.use(notFound);

export default app;
