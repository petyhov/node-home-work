const fs = require("fs");
const path = require("path");
const Joi = require("joi");

const contactsPath = path.join(__dirname, "../models/contacts.json");
const arrContacts = JSON.parse(fs.readFileSync(contactsPath));

class ContactsController {
  getUsers(req, res) {
    return res.status(200).json(arrContacts);
  }

  getById = (req, res) => {
    const userIndex = this.findIndex(req);
    return res.status(200).json(arrContacts[userIndex]);
  };

  addContact(req, res) {
    const newUser = { id: arrContacts.length + 1, ...req.body };
    arrContacts.push(newUser);
    fs.writeFileSync(contactsPath, JSON.stringify(arrContacts));
    return res.status(201).json(newUser);
  }
  removeContact = (req, res) => {
    const userIndex = this.findIndex(req);
    arrContacts.splice(userIndex, 1);
    return res.status(200).json({ message: "contact deleted" });
  };

  updateUser = (req, res) => {
    if (req.body) {
      return res.status(400).json({ message: "missing fields" });
    }
    const userIndex = this.findIndex(req);
    const updateUser = { ...arrContacts[userIndex], ...req.body };
    arrContacts[userIndex] = updateUser;
    fs.writeFileSync(contactsPath, JSON.stringify(arrContacts));
    return res.status(200).json(arrContacts[userIndex]);
  };

  findIndex(req) {
    const { id } = req.params;
    const userId = parseInt(id);
    return arrContacts.findIndex(({ id }) => id === userId);
  }

  validateId = (req, res, next) => {
    const checkIndex = this.findIndex(req);
    if (checkIndex === -1) {
      return res.status(404).json({ message: "Not found" });
    }
    next();
  };

  validateNewUser = (req, res, next) => {
    const validationRules = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required(),
      phone: Joi.string().required(),
    });
    const validationResult = validationRules.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json("message: missing required name field");
    }
    next();
  };
}

module.exports = new ContactsController();
