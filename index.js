const operation = require("./contacts");
const yargs = require("yargs");

const argv = require("yargs").argv;

// TODO: рефакторить
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      operation.listContacts();
      break;

    case "get":
      operation.getContactById(id);
      break;

    case "add":
      operation.addContact(name, email, phone);
      break;

    case "remove":
      operation.removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
