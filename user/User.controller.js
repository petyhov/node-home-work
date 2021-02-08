function getCurrentUserInfo(res, req) {
  const { email, subscription } = req.user;
  req.status(205).send({ email, subscription });
}

module.exports = {
  getCurrentUserInfo,
};
