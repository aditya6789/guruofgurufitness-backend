import mongoose, { Schema } from "mongoose";



const QuerySchema = new Schema({
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
  moblie :{
    type : String,
    required : true,
    minlength:10,
  },
  your_city :{
    type : String,
    required : true,
    
  },
});

export default mongoose.model('Query', QuerySchema)
