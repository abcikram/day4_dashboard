import express from 'express';
const router = express.Router();


import { body, param } from 'express-validator';
import { Admin_authentication, authentication } from '../middleware/auth.js';
import { createCrypto , getAllCoins} from '../Controllers/coinController.js';


router.post('/addcoins',Admin_authentication,
[
    body("title")
      .notEmpty()
      .withMessage("title is require")
      .isString()
      .withMessage("title must be in string"),
    body("quantity")
      .notEmpty()
      .withMessage("quantity should be present")
      .isInt({min:0})
      .withMessage("quantity must be numaric value"),
],createCrypto);


router.get('/getall',Admin_authentication,getAllCoins)





export default router;