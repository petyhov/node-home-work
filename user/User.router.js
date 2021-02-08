const { Router } = require("express");
const userController = require("./User.controller");
const authController = require("../auth/auth.controller");

const router = Router();

router.get(
  "/current",
  authController.authorize,
  userController.getCurrentUserInfo
);

module.exports = router;
