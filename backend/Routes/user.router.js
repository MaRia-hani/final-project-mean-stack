const express = require('express');
const router = express.Router();
const userController = require('../Controllers/user.controller');
const { body, validationResult } = require("express-validator");
const { isAdmin } = require('../Util/auth');


router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Please provide a valid email address"),
    body("password")
      .isLength({ min: 5   })
      .withMessage("Password must be at least 4 characters long"),
    body("name").notEmpty().withMessage("Name is required"),
  ],
  userController.register
);
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please provide a valid email address"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  userController.login
);
router.get("/count",isAdmin, userController.getTotalUsers);
router.post('/logout', userController.logout);
router.get('/:id', userController.getUserNameById);

module.exports = router;





