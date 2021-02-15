const { Router } = require("express");
const userController = require("./User.controller");
const authController = require("../auth/auth.controller");

const router = Router();

router.get(
  "/current",
  authController.authorize,
  userController.getCurrentUserInfo
);

router.patch(
  "/avatars",
  authController.authorize,
  userController.upload.single("avatar_image"),
  userController.updateAvatar
);

module.exports = router;
