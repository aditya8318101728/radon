const JWT= require("jsonwebtoken")
const bookModel = require("../models/bookModel")
const userModel = require("../models/userModel")
let validator = require("validator");
const valid = require("../validator/validator")
const createUser = async function ( req,res ) {
    try{
     let data = req.body
     let {title,name,phone,email,password} =req.body      //DESTRUCTURE
  
  //////////////////////////////BODY SHOULD NOT BE EMPTY////////////////////////////////////////////////
  
     if(Object.keys(data).length==0){
     return res.status(400).send({status:false,msg:"Body should not be empty"})
     }
     
  /////////////////////////////////////////ENUM WORDS ///////////////////////////////////////////
  
  if(!title){
      return res.status(400).send({status:false,msg:"plz enter title key bcoz its mandatory"})
  }
  
  if(!['Miss','Mrs','Mr'].includes(data.title)){
      return res.status(400).send({status:false,msg:"Please use only these three words ( Miss,Mrs,Mr ) in title"})
  }
  
  ////////////////////////////////////////MANDATORY FIELDS////////////////////////////////////////
  
  if(!name){
      return res.status(400).send({status:false,msg:"plz enter name key bcoz its mandatory"})
  }
  if(!phone){
      return res.status(400).send({status:false,msg:"plz enter phone key bcoz its mandatory"})
  }
  if(!email){
      return res.status(400).send({status:false,msg:"plz enter  email bcoz its mandatory"})
  }
  if(!password){
      return res.status(400).send({status:false,msg:"plz enter password key bcoz its mandatory"})
  }
  
  //////////////////////////////////////CONDITION FOR BLANK VALUE//////////////////////////////////////
  
  
  ////////////////////////////////////////// email validation /////////////////////////////////////////
  
//   let regex1 = /^\w+([\.-]?\w+)*@[a-z]\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//   if(!regex1.test(email)){
//       return res.status(400).send({status:false,msg:"plz enter valid email"})
  //}
  const emailcheck = data.email
  const emailvalidate = await userModel.findOne({email:emailcheck})
  if(emailvalidate){
  return res.status(400).send({status:false,msg:"email  already register"})
  }
  
  //////////////////////////////////////MOBILE NUMBER UNIQUE///////////////////////////////////////////
  
  let reg = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(phone);
  if (!reg) {
  return res.status(400).send({ status: false, msg: "invalid phone number" });
  }
  const phoneNumber = data.phone
  const number = await userModel.findOne({phone:phoneNumber})
  if(number){
  return res.status(400).send({status:false,msg:"phone number already register"})
  }
  
  ///////////////////////////////////////USE ALPHABETS IN NAME////////////////////////////////////////
  
  if (!valid.reg(name))
  return res.status(400).send({ status: false, msg: "Please Use only Alphabets in name" });
  
  /////////////////////////////////////ALL SET CREATE DATA/////////////////////////////////////
  
     let savedData = await userModel.create(data);
     res.status(201).send({msg:savedData});
     }catch (err) {
     res.status(500).send({ status: false, msg: err.message });
    }
    };
  
const UserLogin = async function(req,res){
    try{
    const email= req.body.email
    const password= req.body.password
    if(!email){
      return res.status(400).send({status:false,message:"please enter a email "})
    }
    const user= await UserModel.findOne({email:email})
    if(user.length!=1){
        return res.status(404).send({status:false,message:"user does not exits"})
    }
    if(!password){
        return res.status(400).send({status:false,message:"please enter password"})
    }
    if(user.password!=password){
        res.status(400).send({status:false,message:"incorrect password"})
    }
    const token = JWT.sign( 
        {
            userid:user._id.toString(),
            batch:"radon",
            organisation:"Function-Up"
        },
            "Group-4", {expiresIn :"12h"} 
            )
    res.status(201).setHeader("x-api-key",token)

    res.status(200).send({status:true,data:token })

}catch(error){
    res.status(500).send({status:false,message:error})
}
}
module.exports.UserLogin=UserLogin
module.exports.createUser=createUser
  


   





  
  
