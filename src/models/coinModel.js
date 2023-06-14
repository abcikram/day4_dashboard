import mongoose from "mongoose";


const coinSchema = new mongoose.Schema({
    title: {
      type: String,
      unique:true,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    coinImage:{
        type:String
    }
  });

const Cryptos = mongoose.model('Coins', coinSchema)

export default Cryptos