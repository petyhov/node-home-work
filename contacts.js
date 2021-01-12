const fs = require("fs");
const path = require("path");
const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  fs.readFile(contactsPath, (err, data) => {
    if (err) throw err;
    console.log(JSON.parse(data));
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) throw err;
    const contactById = JSON.parse(data).find(
      (conatact) => conatact.id === contactId
    );
    console.log(contactById);
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) throw err;
    arrContacts = JSON.parse(data);
    const newArrContacts = arrContacts.filter(
      (contact) => contact.id !== contactId
    );
    fs.writeFile(contactsPath, JSON.stringify(newArrContacts), (err) => {
      if (err) throw err;
      console.log(newArrContacts);
    });
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) throw err;
    const arrContacts = JSON.parse(data);
    arrContacts.push({ id: arrContacts.length + 1, name, email, phone });
    fs.writeFile(contactsPath, JSON.stringify(arrContacts), (err) => {
      if (err) throw err;
      console.log(arrContacts);
    });
  });
}

module.exports = { listContacts, getContactById, removeContact, addContact };
