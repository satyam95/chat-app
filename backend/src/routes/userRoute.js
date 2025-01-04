import express from "express";
import {
  getOtherUsers,
  login,
  logout,
  register,
} from "../controllers/userController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.route("/").get(isAuthenticated, getOtherUsers); // http://localhost:8080/api/v1/user
router.route("/register").post(register); // http://localhost:8080/api/v1/user/register
router.route("/login").post(login); // http://localhost:8080/api/v1/user/login
router.route("/logout").get(logout); // http://localhost:8080/api/v1/user/logout

export default router;
