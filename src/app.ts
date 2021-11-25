import express from "express";
import morgan from "morgan";
import errorHandler from "errorhandler";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import cors from "cors";
import path from "path";
import passport from "./config/passportSetup";
import { json, urlencoded } from "body-parser";
import {
  router as reservaRouter,
  path as reservaPath,
} from "./routes/reservas.routes";
import { router as authRouter, path as authPath } from "./routes/auth.routes";
import {
  router as acomodacoesRouter,
  path as acomodacoesPath,
} from "./routes/acomodacoes.routes";

const app = express();
app.set("port", process.env.PORT || 3000);
const uriMongoDB = process.env.MONGO_URL || "mongodb://localhost:27017/";

// conectar ao banco de dados
mongoose
  .connect(uriMongoDB)
  .then(() => console.log("Conectado ao MongoDb Atlas"))
  .catch((err) => {
    console.log("Falha de acesso ao BD:");
    console.error(err);
  });

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));

// middleware para lidar a sessão de usuário
const sessionOptions = {
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongoUrl: uriMongoDB }),
  cookie: {
    secure: false,
  },
};

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1); // trust first proxy
  sessionOptions.cookie.secure = true; // serve secure cookies
}

app.use(session(sessionOptions));

// passport
app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
  app.use(errorHandler());
} else {
  app.use(morgan("tiny"));
}

app.use(`/api/v${process.env.API_VERSION}${authPath}`, authRouter);
app.use(`/api/v${process.env.API_VERSION}${reservaPath}`, reservaRouter);
app.use(
  `/api/v${process.env.API_VERSION}${acomodacoesPath}`,
  acomodacoesRouter,
);
app.use("/files", express.static(path.resolve(__dirname, "..", "uploads")));
export default app;
