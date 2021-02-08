const { Router } = require("express");
const ContactsController = require("./contacts.controller");
const userController = require("../auth/auth.controller");

const router = Router();

router.get("/", userController.authorize, ContactsController.getContacts);
router.get(
  "/:id",
  userController.authorize,
  ContactsController.validateContactId,
  ContactsController.getById
);
router.post(
  "/",
  userController.authorize,
  ContactsController.validateNewUser,
  ContactsController.addContact
);

router.delete(
  "/:id",
  userController.authorize,
  ContactsController.validateContactId,
  ContactsController.removeContact
);

router.put(
  "/:id",
  userController.authorize,
  ContactsController.validateContactId,
  ContactsController.validateUpdateUser,
  ContactsController.updateUser
);

module.exports = router;
