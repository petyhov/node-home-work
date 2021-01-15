const {
  Types: { ObjectId },
} = require("mongoose");
const Joi = require("joi");

const Contact = require("./Contact");

async function getContacts(req, res) {
  const contact = await Contact.find();
  res.status(200).json(contact);
}

function validateContactId(req, res, next) {
  const {
    params: { id },
  } = req;
  if (!ObjectId.isValid(id)) {
    return res.status(400).send("Id is not valid");
  }
  next();
}

async function getById(req, res) {
  const {
    params: { id },
  } = req;
  const contact = await Contact.findById(id);

  if (!contact) {
    return res.status(404).send("Contact is not found");
  }

  return res.status(200).json(contact);
}

function validateNewUser(req, res, next) {
  const validationRules = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    subscription: Joi.string().required(),
    password: Joi.string().required(),
  });

  const validationResult = validationRules.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json(validationResult.error);
  }
  next();
}

function validateUpdateUser(req, res, next) {
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
}

async function addContact(req, res) {
  try {
    const newContact = await Contact.create(req.body);
    return res.status(201).json(newContact);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).send("Email is duplicated");
    }
  }
}

async function removeContact(req, res) {
  const {
    params: { id },
  } = req;
  const deletedContact = await Contact.findByIdAndDelete(id);

  if (!deletedContact) {
    return res.status(404).send("Contact is not found");
  }

  res.status(200).json({ message: "Contact deleted" });
}

async function updateUser(req, res) {
  console.log(req.body);

  const {
    params: { id },
  } = req;

  const updateContact = await Contact.findByIdAndUpdate(
    id,
    {
      $set: req.body,
    },
    {
      new: true,
    }
  );

  if (!updateContact) {
    return res.status(404).send("Contact is not found");
  }
  res.status(200).json(updateContact);
}

module.exports = {
  getContacts,
  validateContactId,
  getById,
  validateNewUser,
  addContact,
  removeContact,
  updateUser,
  validateUpdateUser,
};
