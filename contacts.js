const fs = require("fs");
const path = require("path");
const contactsPath = path.join(__dirname, "db/contacts.json");
const arrContacts = JSON.parse(fs.readFileSync(contactsPath));

function listContacts() {
  return arrContacts;
}

function getContactById(contactId) {
  return arrContacts.find((conatact) => conatact.id === contactId);
}

function removeContact(contactId) {
  const newArrContacts = arrContacts.filter(
    (contact) => contact.id !== contactId
  );
  fs.writeFileSync(contactsPath, JSON.stringify(newArrContacts));
}

function addContact(name, email, phone) {
  arrContacts.push({ id: arrContacts.length + 1, name, email, phone });
  fs.writeFileSync(contactsPath, JSON.stringify(arrContacts));
}

module.exports = { listContacts, getContactById, removeContact, addContact };
