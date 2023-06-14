import express from 'express';
const router = express.Router();

import { getAllUserData, userRegister, userlogin,getParticularUser, currentCoins } from '../Controllers/userController.js';
import { body, param } from 'express-validator';
import { Admin_authentication, authentication } from '../middleware/auth.js';



router.post('/useregister', [
    body("name")
      .notEmpty()
      .withMessage("name is require")
      .isString()
      .withMessage("name must be in string"),

    body("phone")
      .notEmpty()
      .withMessage("phone number is require")
      .isString()
      .withMessage("Phone number is in string")
      .isMobilePhone()
      .withMessage("Mobile  number is not valid"),

    body("email")
      .notEmpty()
      .withMessage("email is require")
      .trim()
      .isEmail()
      .withMessage("enter valid email"),

    body("password")
      .notEmpty()
      .trim()
      .withMessage("password must be present")
      .isStrongPassword()
      .withMessage(
        "Length of the password must be between 8 to 15 characters , atleast use one Uppercase and one unique characters"
      ),

    body("status")
      .optional()
      .isIn(["admin", "customer"])
      .withMessage("status must be  admin or customer"),
  ],userRegister);


router.post('/login',  [
    body("email")
      .notEmpty()
      .withMessage("email is require")
      .trim()
      .isEmail()
      .withMessage("enter valid email"),

    body("password")
      .notEmpty()
      .trim()
      .withMessage("password must be present")
      .isStrongPassword()
      .withMessage(
        "Length of the password must be between 8 to 15 characters , atleast use one Uppercase and one unique characters"
      ),
  ],userlogin)

  router.get('/getall',Admin_authentication,getAllUserData)
   
  router.get('/data/:userId',authentication, 
    [
         param("userId").isMongoId().withMessage("userId is not validate")

    ],getParticularUser)

    router.get('/initialUser',currentCoins)




export default router