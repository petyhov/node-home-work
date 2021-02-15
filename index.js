const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");

dotenv.config();

const contactsRouter = require("./contacts/contacts.router");
const authRouter = require("./auth/auth.router");
const userRoute = require("./user/User.router");

const PORT = process.env.PORT || 8080;
const { DB_PASSWORD, DB_NAME } = process.env;
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
  server.use(express.static("public"));
  server.use(cors());
  server.use(morgan("dev"));
}

function declareRoutes() {
  server.use("/contacts", contactsRouter);
  server.use("/auth", authRouter);
  server.use("/users", userRoute);
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
