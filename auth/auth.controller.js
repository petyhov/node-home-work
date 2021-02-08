const {
  Types: { ObjectId },
} = require("mongoose");
const Joi = require("joi");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../user/User");

function validationLogin(req, res, next) {
  const validatinRules = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  const validationResult = validatinRules.validate(req.body);

  if (validationResult.error) {
    return res
      .status(400)
      .send("Ошибка от Joi или другой валидационной библиотеки");
  }
  next();
}

async function createUser(req, res) {
  try {
    const {
      body: { password },
    } = req;
    const hashedPassword = await bcryptjs.hash(password, 8);
    const newUser = await Users.create({
      ...req.body,
      password: hashedPassword,
    });
    const { email, subscription } = newUser;
    return res.status(201).json({ email, subscription });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).send("message: Email in use");
    }
  }
}

async function login(req, res) {
  const {
    body: { email, password },
  } = req;
  const findUser = await Users.findOne({ email });
  if (!findUser) {
    return res.status(401).send("Email or password is wrong");
  }
  const passwordCheckResult = await bcryptjs.compare(
    password,
    findUser.password
  );
  if (!passwordCheckResult) {
    return res.status(401).send("Email or password is wrong");
  }
  const token = await jwt.sign(
    { userId: findUser._id },
    process.env.JWT_SECRET
  );
  findUser.token = token;
  findUser.save();
  const subscriptionStatus = findUser.subscription;
  res.status(200).send({
    token,
    user: {
      email,
      subscription: subscriptionStatus,
    },
  });
}

async function authorize(req, res, next) {
  try {
    const authorizationHeader = req.get("Authorization");
    const token = authorizationHeader.replace("Bearer ", "");
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const findUser = await Users.findById(userId);
    if (!findUser) {
      return res.status(401).send("message: Not authorized");
    }
    res.user = findUser;
    next();
  } catch (err) {
    return res.status(401).send("message: Not authorized");
  }
}

function logout(req, res) {
  const { user } = res;
  user.token = null;
  user.save();
  res.status(204).send();
}

function currentUserInfo(req, res) {
  res.status(200).send(res.user);
}

module.exports = {
  validationLogin,
  createUser,
  login,
  authorize,
  logout,
};
