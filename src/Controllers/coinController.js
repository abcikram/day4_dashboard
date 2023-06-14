import { matchedData, validationResult } from "express-validator";
import Cryptos from "../models/coinModel.js";

export const createCrypto = async(req,res) => {
try{
   
    const error = validationResult(req);
        
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array()[0].msg });
    }

    const data = matchedData(req);

    const cryptoCreate =  await Cryptos.create(data)

    res.status(201).send({status:true,message:"crypto  created Successfully", data:cryptoCreate})

    }catch(error){
    return res.status(500).json({ status: false, message: error.message });
  }
}

export const getAllCoins = async(req,res) =>{
    try{
        const  data = await Cryptos.find({})

        if(data.length <= 0) return res.status(404).send({status:false, message :"data is not found"})
            
        res.status(200).send({status:true, message:"user details", data:data})
    }catch(error){
        return res.status(500).json({ status: false, message: error.message });
    }
}