const { Router } = require("express");
const ContactsController = require("../controllers/contacts.controller");

const router = Router();

router.get("/", ContactsController.getUsers);
router.get("/:id", ContactsController.validateId, ContactsController.getById);
router.post(
  "/",
  ContactsController.validateNewUser,
  ContactsController.addContact
);
router.delete(
  "/:id",
  ContactsController.validateId,
  ContactsController.removeContact
);
router.put(
  "/:id",
  ContactsController.validateId,
  ContactsController.updateUser
);

module.exports = router;
