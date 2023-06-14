import { matchedData, validationResult } from "express-validator";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Cryptos from "../models/coinModel.js";


//user or admin signin :-
export const userRegister = async (req, res) => {
  try {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array()[0].msg });
    }

    const data = matchedData(req);

    //encripted password:-
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(data.password, salt);
    req.body.password = newPassword;

    //======== -: dynamically user current Crypto status :- =========//

    const curr = await Cryptos.find({});

    curr.map((doc) => {
       doc.quantity = 0;
    });

    data.coin = curr

    const users = await User.create(data);

    return res
      .status(201)
      .json({ status: true, message: "user is created", data: users });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

//user or admin login :-
export const userlogin = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array()[0].msg });
    }

    // check email for admin
    let userEmail = await User.findOne({ email: req.body.email });
    if (!userEmail)
      return res.status(400).send({
        status: false,
        message: "Email is not correct, Please provide valid email",
      });

    const checkpass = await bcrypt.compare(
      req.body.password,
      userEmail.password
    );

    // console.log(checkpass);

    if (checkpass == false)
      return res
        .status(400)
        .send({ status: false, message: "Please enter currect password" });

    const user = await User.findOne({
      email: req.body.email,
      password: userEmail.password,
    });
    if (!user)
      return res
        .status(400)
        .send({ status: false, message: "email or password are wrong" });

    const token = jwt.sign(
      {
        userId: user._id.toString(),
        status: user.status,
      },
      "CRYPTO"
    );

    res.status(200).send({
      status: true,
      message: "user Login Successfully",
      token: token,
    });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

//getallUserdata :-

export const getAllUserData = async (req, res) => {
  try {
    const data = await User.find({});

    if (data.length <= 0)
      return res
        .status(404)
        .send({ status: false, message: "data is not found" });

    res.status(200).send({ status: true, message: "user details", data: data });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

// get particular user :-

export const getParticularUser = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array()[0].msg });
    }

    const data = matchedData(req);

    const userIdfromToken = req.userId;

    const checkAdminroles = await User.findById(userIdfromToken);
    if (!checkAdminroles)
      return res
        .status(404)
        .send({ status: false, message: "user data not found" });

    //authorization:-
    if (checkAdminroles.status != "admin" || data.userId !== userIdfromToken) {
        return res.status(403).send({ status: false, message: "Unauthorize access" });
      }
        const userAccess = await User.findById(data.userId);
      

      if (!userAccess)
        return res.status(404).send({ status: false, message: "Data not found" });

      res.status(200).send({ status: true, data: userAccess });
   
    } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

//userCurrent coins :-
export const currentCoins = async (req, res) => {
  const curr = await Cryptos.find({});

  curr.map((doc) => {
    doc.quantity = 0;
  });

  res.send(curr)
};

//userCollectcoins :-
export const userCollectCoins = async(req,res) =>{

    
}














