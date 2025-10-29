import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  street: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  zipcode:{type:Number}
});

export default addressSchema;
