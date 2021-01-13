const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

const contactsRouter = require("./contacts/contacts.router");

dotenv.config();
const DB_NAME = process.env.DB_NAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const PORT = process.env.PORT || 8080;
const MONGO_URL = `mongodb+srv://admin:${DB_PASSWORD}@cluster0.zh685.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

let server;

function start() {
  initServer();
  initMiddlewares();
  declareRoutes();
  connectDatabase();
  listen();
}

function initServer() {
  server = express();
}

function initMiddlewares() {
  server.use(express.json());
  server.use(cors());
  server.use(morgan("dev"));
}

function declareRoutes() {
  server.use("/contacts", contactsRouter);
}

async function connectDatabase() {
  await mongoose
    .connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(
      () => {
        console.log("Database connection successful");
      },
      (err) => {
        console.log(err);
        process.exit(1);
      }
    );
}

function listen() {
  server.listen(PORT, () => {
    console.log("Server is listening on port: " + PORT);
  });
}

start();
