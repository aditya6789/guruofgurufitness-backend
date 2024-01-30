import mongoose, { Schema } from "mongoose";



const UserSchema = new Schema({
  full_name: {
    type : String,
    required : true,
    maxlength:50,
  },
  email :{
    type:String,
    unique : true,
    required:true
    
  },
  password :{
    type : String,
    required : true,
    minlength:6
  },
  repeat_password :{
    type : String,
    required : true,
    minlength:6
  },
});

export default mongoose.model('User', UserSchema)
