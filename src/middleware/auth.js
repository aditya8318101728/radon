const JWT= require("jsonwebtoken")
const bookModel = require("../models/bookModel")
const valid = require("../validator/validator.js")


const authenticate= async function(req,res,next){
    try{
    const token= req.headers["x-api-key"]
    
    if(!token){
        res.status(400).send({status:false,msg:"Please enter token"})
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
        if(!decodedToken) return res.status(400).send({status : false, msg : "Token should be present!"})
        //if (!valid.jwtValidation(decodedToken)) return res.status(400).send({ status: false, msg: "The token is invalid!!" });

        let userLoggedIn = decodedToken.userId
       // console.log(userLoggedIn)

        let findUserId = await bookModel.findById(bookId)
        if(!findUserId) return res.status(404).send({status : false, msg : "No book found with this bookId"})

        let newUserId = findUserId.userId.toString()
        //console.log(newUserId)


        if(userLoggedIn !== newUserId) return res.status(401).send({status : false, msg : "You're not authorized!"})

        next()


        
    }catch(error){
        res.status(500).send({status:false ,message:error})
    }
}





module.exports.authenticate = authenticate
module.exports.authorize = authorize