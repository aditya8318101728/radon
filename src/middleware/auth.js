const JWT= require("jsonwebtoken")
const midllauth= async function(req,res,next){
    try{
    const token= req.headers["x-api-key"]
    
    if(!token){
        res.status(400).send({status:false,msg:"please enter token"})
    }
    let decodedtoken = JWT.verify(token,"Group-4") //authentication
    
     if(!decodedtoken){
        res.status(400).send({status:false, msg:"invalid token"})
     }
     next()
    }
    catch(error){
        res.status(500).send({status:false ,message:error})
    }
}
module.exports.midllauth=midllauth