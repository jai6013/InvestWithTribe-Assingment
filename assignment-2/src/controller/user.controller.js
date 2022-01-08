// Imports
const router = require("express").Router();
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { body, validationResult } = require("express-validator");
const authenticate = require("../middlewares/authenticate");
// -------------------------------------------------------------------

// Token Generator
const newToken = (user) => jwt.sign({ user }, process.env.JWT_KEY);
// -------------------------------------------------------------------

// Signup route
router.post(
  "/signup",
  body("username")
    .exists()
    .isLength({ min: 3 })
    .isAlphanumeric()
    .withMessage(
      "username should be minimum 3 characters and should not contain special characters"
    ),
  body("email").exists().isEmail().withMessage("nor a valid email id"),
  body("password")
    .exists()
    .isAlphanumeric()
    .isLength({ min: 6 })
    .withMessage("password should be alpha numeric with minimum 6 characters"),
  async (req, res) => {
    try {
      const { errors } = validationResult(req);

      if (errors.length > 0) return res.status(400).json({ errors });

      let user = await User.findOne({ username: req.body.username })
        .lean()
        .exec();
      if (user)
        return res.status(403).json({ message: "username already exists" });
      user = await User.findOne({ email: req.body.email }).lean().exec();
      if (user)
        return res.status(403).json({ message: "email already exists" });

      user = await User.create(req.body);

      const token = newToken(user);
      return res.status(201).json({ token, user });
    } catch (err) {
      // console.log(err);
      return res.status(400).send(err);
    }
  }
);

// ------------------------------------------------------------------

module.exports = router;
