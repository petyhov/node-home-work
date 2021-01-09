const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const contactsRouter = require("./routers/contacts.router");

const PORT = 8080;

class Server {
  constructor() {
    this.server = null;
  }
  start() {
    this.server = express();
    this.initMiddleware();
    this.initRouters();
    this.listen();
  }
  initMiddleware() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(morgan("dev"));
  }
  initRouters() {
    this.server.use("/contacts", contactsRouter);
  }
  listen() {
    this.server.listen(PORT, () => {
      console.log("Server is listening on port: " + PORT);
    });
  }
}

const server = new Server();

server.start();
