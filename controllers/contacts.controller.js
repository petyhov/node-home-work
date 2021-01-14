const fs = require("fs");
const path = require("path");
const Joi = require("joi");

const contactsPath = path.join(__dirname, "../models/contacts.json");

class ContactsController {
  getUsers(req, res) {
    fs.readFile(contactsPath, (err, data) => {
      if (err) throw err;
      return res.status(200).json(JSON.parse(data));
    });
  }

  getById = (req, res) => {
    fs.readFile(contactsPath, (err, data) => {
      if (err) throw err;
      const arrContacts = JSON.parse(data);
      const id = this.parseId(req);
      const contactById = arrContacts.find((contact) => contact.id === id);
      return res.status(200).json(contactById);
    });
  };

  addContact(req, res) {
    fs.readFile(contactsPath, (err, data) => {
      if (err) throw err;
      const arrContacts = JSON.parse(data);
      const newUser = { id: arrContacts.length + 1, ...req.body };
      arrContacts.push(newUser);
      fs.writeFile(contactsPath, JSON.stringify(arrContacts), (err) => {
        if (err) throw err;
        return res.status(201).json(newUser);
      });
    });
  }

  removeContact = (req, res) => {
    fs.readFile(contactsPath, (err, data) => {
      if (err) throw err;
      const id = this.parseId(req);
      const arrContacts = JSON.parse(data);
      const newArrContacts = arrContacts.filter((contact) => contact.id !== id);
      fs.writeFile(contactsPath, JSON.stringify(newArrContacts), (err) => {
        if (err) throw err;
        return res.status(200).json({ message: "contact deleted" });
      });
    });
  };

  updateUser = (req, res) => {
    fs.readFile(contactsPath, (err, data) => {
      if (Object.keys(req.body).length === 0) {
        res.status(400).json({ message: "missing fields" });
      }
      const id = this.parseId(req);
      const arrContacts = JSON.parse(data);
      arrContacts.map((contact) => {
        if (contact.id === id) {
          contact = { ...contact, ...req.body };
          fs.writeFile(contactsPath, JSON.stringify(arrContacts), (err) => {
            if (err) throw err;
            return res.status(200).json(contact);
          });
        }
      });
    });
  };

  validateId = (req, res, next) => {
    fs.readFile(contactsPath, (err, data) => {
      const id = this.parseId(req);
      const arrContacts = JSON.parse(data);
      const result = arrContacts.find((contact) => contact.id === id);
      if (!result) {
        return res.status(404).json({ message: "Not found" });
      }
      next();
    });
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

  validateUpdateUser = (req, res, next) => {
    const validationRules = Joi.object({
      name: Joi.string(),
      email: Joi.string(),
      phone: Joi.string(),
    });
    const validationResult = validationRules.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json("message: incorrect data");
    }
    next();
  };

  parseId(req) {
    const {
      params: { id },
    } = req;
    const intId = parseInt(id);
    return intId;
  }
}

module.exports = new ContactsController();
