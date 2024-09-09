import { body } from "express-validator";
import { User } from "../../models/userModel.js";

const checkEmailInUse = async (email) => {
  const user = await User.findOne({ email });
  if (user) {
    const error = new Error("This email is already in use!");
    throw error;
  }
};


export const registerValidation = [
  body("firstName")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("First name is a required field!")
    .matches(/^[a-zA-Z]+$/)
    .withMessage("Invalid characters for Last name! Use letters a-z")
    .isLength({ min: 2 })
    .withMessage("First name must be at least 2 characters!"),
    body("lastName")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Last name is a required field!")
    .matches(/^[a-zA-Z]+$/)
    .withMessage("Invalid characters for Last name! Use letters a-z")
    .isLength({ min: 2 })
    .withMessage("Last name must be at least 2 characters!"),
  body("email")
    .trim()
    .escape()
    .normalizeEmail()
    .isEmail()
    .withMessage("Invalid email address!")
    .notEmpty()
    .withMessage("Email is a required field!")
    .custom(checkEmailInUse)
    .withMessage("Email is already in use!"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required!")
    .isLength({ min: 5 })
    .withMessage("Password is to short! Minimum length is 5 characters"),
];

export const loginValidation = [
  body("email")
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Email is required!')
    .normalizeEmail()
    .isEmail()
    .withMessage("Invalid email!"),

  body("password").notEmpty().withMessage("Password is required!"),
];
