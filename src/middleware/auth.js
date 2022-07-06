const JWT= require("jsonwebtoken")
const midllauth= async function(req,res,nex){
    try{
    const token= req.header["x-api-key"]
    let data=req.body
    let user=data.userid
    if(!token){
        res.status(400).send({status:false,message:"please enter token"})
    }
    let decodedtoken=JWT.verify(token,"Group-4")
    let userid= decodedtoken.userid
    if(userid!=user){
        return res.status(401).send({status:false,message:"login user is different modified user"})
     }
     if(!decodedtoken){
        res.status(400).send({status:false,message:"invalid token"})
     }
     next()
    }
    catch(error){
        res.status(500).send({status:false ,message:error})
    }
}
module.exports.midllauth=midllauth