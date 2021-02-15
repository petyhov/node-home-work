const multer = require("multer");
const path = require("path");

function getCurrentUserInfo(req, res) {
  const { email, subscription } = req.user;
  res.status(205).send({ email, subscription });
}

const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    const ext = path.parse(file.originalname).ext;
    cb(null, req.user._id + ext);
  },
});

const upload = multer({ storage: avatarStorage });

function updateAvatar(req, res, next) {
  const { avatarURL } = req.user;
  res.status(207).json(avatarURL);
}

module.exports = {
  getCurrentUserInfo,
  updateAvatar,
  upload,
};
