import { User } from "../models/userModel.js";
import { createToken } from "../utils/token.js";
import nodemailer from "nodemailer";
import { emailTemplate } from "../utils/emailTemplate.js";

export const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;
    if (!firstName || !lastName || !email || !password) {
      const error = new Error("incomplete user data for registration");
      throw error;
    }
    const newUser = await User.create({ firstName, lastName, email, password, role });

    // const token = await createToken(
    //   {
    //     userID: newUser._id,
    //     email: newUser.email,
    //   },
    //   process.env.SECRET_KEY,
    //   { expiresIn: "24h" }
    // );

    // const transporter = nodemailer.createTransport({
    //   host: process.env.HOST,
    //   port: 465,
    //   secure: true,
    //   auth: {
    //     user: process.env.EMAIL,
    //     pass: process.env.PASSWORD,
    //   },
    // });

    // try {
    //   transporter.verify(function (error, success) {
    //     if (error) {
    //       console.log(error);
    //     } else {
    //       console.log("Server ready for messages");
    //     }
    //   });
    //   await transporter.sendMail({
    //     from: process.env.EMAIL,
    //     to: email,
    //     subject: "Account activation",
    //     html: emailTemplate(firstName, token, newUser._id),
    //   });
    // } catch (emailError) {
    //   console.log("Error sending email", emailError);
    //   return res
    //     .status(500)
    //     .json({ msg: "Failed to send verification email." });
    // }

    //to delete password - convert JSON to JS Object
    const userObject = newUser.toObject();
    delete userObject.password;
    delete userObject.__v;

    res.status(200).json({ msg: "registration successful", userObject });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "Username or password missing!" });
    }
    const isUser = await User.findOne({ email });
    if (!isUser) {
      return res.status(401).json({ msg: "User not found" });
    }
    const isVerified = await isUser.authenticate(password);
    if (!isVerified) {
      return res.status(401).json({ msg: "Incorrect password" });
    }

    //delete password from User Object to send back
    const userObject = isUser.toObject();
    delete userObject.password;
    delete userObject.__V;

    const token = await createToken(
      {
        userID: userObject._id,
        email: userObject.email,
        role: userObject.role,
      },
      process.env.SECRET_KEY,
      { expiresIn: "24h" }
    );

    res
      .status(200)
      .cookie("Le_Toquen", token, {
        httpOnly: true,
        sameSite: "lax",
        expires: new Date(Date.now() + 3600000 * 24), //expires in 24 hours
      })
      .json({ msg: `login successful! welcome ${userObject.firstName}` });
  } catch (error) {
    next(error);
  }
};
