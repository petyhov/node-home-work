const { Router } = require("express");
const userController = require("./auth.controller");

const router = Router();
router.get("/current", userController.authorize);
router.post(
  "/register",
  userController.validationLogin,
  userController.createUser
);
router.post("/login", userController.validationLogin, userController.login);
router.post("/logout", userController.authorize, userController.logout);

module.exports = router;
