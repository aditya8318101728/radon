const UserModel= require("../models/userModel")
const JWT= require("jsonwebtoken")


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

   


