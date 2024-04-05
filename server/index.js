import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import mongoose from "mongoose";
import "dotenv/config";
import routes from "./src/routes/index.js";

const app = express();

app.use(cors()); // Support du partage des ressources entre origines CORS pour le serveur Express
app.use(express.json()); // Analyse des requêtes entrantes avec des JSON et les rend disponibles sous la propriété 'req.body'
app.use(express.urlencoded({ extended: false })); // Analyse les URL encodées et les rend disponibles sous la propriété 'req.body' || extended: false signifie que la bibliothèque 'querystring'sera utilisée pour analyser les données encodées en URL
app.use(cookieParser()); // Analyse les cookies attachés à la requête et les rend disponibles sosu la propriété 'req.cookies'

app.use("/api/v1", routes);

const port = process.env.PORT || 5000; // Si variable d'environnement non dispo, utilisation du port 5000 par défaut

const server = http.createServer(app);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Mongodb connected");
    server.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log({ err });
    process.exit(1);
  });
