const JWT= require("jsonwebtoken")
const bookModel = require("../models/bookModel")


const authenticate= async function(req,res,next){
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






const authorize= async function(req,res,next){
    try{
        const token = req.headers["x-api-key"]
        let bookId = req.params.bookId

        if(!token) return res.status(400).send({status: false, msg : "Please provide a token!"})

        let decodedToken = JWT.verify(token, "Group-4")
        if(!decodedToken) return res.status(401).send({status : false, msg : "Invalid token!"})

        let userId = await bookModel.findById(bookId).select({userId : 1})
        if(!userId) return res.status(404).send({status : false, msg : "No book found with this bookId"})

        if(decodedToken !== userId) return res.status(401).send({status : false, msg : "You're not authorized!"})

        next()


        
    }catch(error){
        res.status(500).send({status:false ,message:error})
    }
}





module.exports.authenticate = authenticate
module.exports.authorize = authorize