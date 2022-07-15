const userModel = require("../models/userModel")
let validator = require("validator");
const valid = require("../validator/validator")
const jwt = require("jsonwebtoken")
const passValidator = require('password-validator');



const createUser = async function ( req,res ) {
  try{
   let data = req.body
   let {title,name,phone,email,password} = data      //DESTRUCTURE

//    let address = req.body.address 
//    let pincode = address.pincode
//    if(typeof pincode !== "string") return res.status(400).send({status : false, msg : "Pincode should be in String!"})



   if(Object.keys(data).length==0){
   return res.status(400).send({status : false, msg : "Body should not be empty!"})
   }
   


if(!title){
    return res.status(400).send({status:false,msg:"Title is mandatory!"})
}


if(!['Miss','Mrs','Mr'].includes(data.title)){
    return res.status(400).send({status : false, msg : "Should include 'Miss', 'Mr' or 'Mrs only!"})
}


if(!valid.isValid(name)){
    return res.status(400).send({status:false,msg:"Please provide a name!"})
}
if(typeof name !== "string") return res.status(400).send({status : false, msg : "Data-type should be String only!"})
if (!valid.reg(name))
return res.status(400).send({ status: false, msg: "Please use only alphabets in name!" });
data.name = data.name.trim().split(" ").filter(word =>word).join(" ")

if(!phone){
    return res.status(400).send({status:false,msg:"Please provide a phone number!"})
}

if(!email){
    return res.status(400).send({status:false,msg:"Please provide an email!"})
}

if(!password){
    return res.status(400).send({status:false,msg:"Please provide a password!"})
}

const schema = new passValidator();
schema.is().min(8)
if (!schema.validate(password)) {
    return res.status(400).send({ status: false, msg: "Minimum length of password should be 8 characters" })
}

schema.is().max(15)
if (!schema.validate(password)) {
    return res.status(400).send({ status: false, msg: "Max length of password should be 15 characters" })
}


let regex1 = /^\w+([\.-]?\w+)@[a-z]\w+([\.-]?\w+)(\.\w{2,3})+$/;
if(!regex1.test(email)){
    return res.status(400).send({status:false,msg:"The email is invalid!"})
}
const emailcheck = data.email
const emailvalidate = await userModel.findOne({email:emailcheck})
if(emailvalidate){
return res.status(400).send({status:false,msg:"This email already exists!"})
}



let reg = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(phone);
if (!reg) {
return res.status(400).send({ status: false, msg: "Invalid phone number!" });
}
const phoneNumber = data.phone
const number = await userModel.findOne({phone:phoneNumber})
if(number){
return res.status(400).send({status:false,msg:"Phone number already exists!"})
}



   let savedData = await userModel.create(data);
   res.status(201).send({msg:savedData});
   }catch (err) {
   res.status(500).send({ status: false, msg: err.message });
   }
}










//User Login



  const userLogin = async function(req,res){
    try{
    const email= req.body.email
    const password= req.body.password
    if(!email){
      return res.status(400).send({status:false,message:"Please enter an email!"})
    }
    const user = await userModel.findOne({email:email})
    if(!user){
        return res.status(404).send({status:false,message:"User does not exists!"})
    }
    if(!password){
        return res.status(400).send({status:false,message:"Please enter Password!"})
    }
    if(user.password!=password){
        res.status(400).send({status:false,message:"Incorrect Password!"})
    }
   
    const token = jwt.sign( 
        {
            userId : user._id.toString(),
            batch : "radon",
            organisation : "Function-Up"
        },
            "Group-4", {expiresIn : "12h"} 
            )
    //res.status(200).setHeader("x-api-key",token)
    res.status(200).send({status:true, data:token })

}catch(error){
    res.status(500).send({status : false, message:error})
}
}
  






  module.exports.createUser = createUser
  module.exports.userLogin = userLogin