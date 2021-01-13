const { Router } = require("express");
const ContactsController = require("./contacts.controller");

const router = Router();

router.get("/", ContactsController.getContacts);
router.get(
  "/:id",
  ContactsController.validateContactId,
  ContactsController.getById
);
router.post(
  "/",
  ContactsController.validateNewUser,
  ContactsController.addContact
);

router.delete(
  "/:id",
  ContactsController.validateContactId,
  ContactsController.removeContact
);

router.put(
  "/:id",
  ContactsController.validateContactId,
  ContactsController.updateUser
);

module.exports = router;
