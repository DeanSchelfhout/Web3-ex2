const { validationResult } = require("express-validator")
const prisma = require("../config/prisma")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const FIVE_DAYS = 5 * 24 * 60 * 60 * 1000
const JWT_SECRET = process.env.JWT_SECRET

const AuthController = {
  login: async (req, res) => {
    try {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const { email, password } = req.body;

      const user = await prisma.user.findUnique({
        where: { email }
      })

      if (!user) {
        return res.status(404).json({ message: "User not found." })
      }

      const passwordValid = await bcrypt.compare(password, user.password)
      if (!passwordValid) {
        return res.status(401).json({ message: "Invalid credentials." })
      }

      const payload = {
        sub: user.id,
        iat: Date.now(),
      }
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: FIVE_DAYS / 1000 })

      const { password: _, ...userWithoutPassword } = user

      res.cookie("authToken", token, { httpOnly: true, maxAge: FIVE_DAYS })
      res.status(200).json({ user: userWithoutPassword })
      return res
    } 
    catch (error) {
      console.error(error)
      res.status(500).json({ message: "An error occurred during login." })
    }
  },

  verify: async (req, res) => {
    try {
      const reqUserId = req.userId

      const user = await prisma.user.findUnique({
        where: { id: reqUserId },
      })

      if (!user) {
        return res.status(404).json({ message: "User not found." })
      }

      const { password: _, ...userWithoutPassword } = user
      return res.status(200).json({ user: userWithoutPassword })
    } 
    catch (error) {
      console.error(error)
      return res.status(500).json({ message: "An error occurred during verification." })
    }
  },

  resetPassword: async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const { password } = req.body || req.params || req.query
      const reqUserId = req.userId;

      const hashedPassword = await bcrypt.hash(password, 10);

      await prisma.user.update({
        where: { id: reqUserId },
        data: { password: hashedPassword },
      });

      res.clearCookie("authToken");
      return res.status(200).json({ message: "Password changed succesfuly." });
    } 
    catch (error) {
      console.error(error);
      return res.status(500).json({ message: "An error occurred while resetting the password." })
    }
  },

  logout: async (req, res) => {
    try {
      res.clearCookie("authToken")
      return res.sendStatus(200)
    } 
    catch (error) {
      console.error(error)
      return res.status(500).json({ message: "An error occurred during logout." })
    }
  },
};

module.exports = AuthController;
