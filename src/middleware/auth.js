const JWT= require("jsonwebtoken")
const bookModel = require("../models/bookModel")
const valid = require("../validator/validator.js")


const authenticate= async function(req,res,next){
    try{
        
    const token= req.headers["x-api-key"]
    const data  = req.body
    const user = data.userId
    
    if(!token){
        res.status(400).send({status:false,msg:"Please enter token"})
    }
    let decodedtoken = JWT.verify(token,"Group-4") //authentication

    // let exp = decodedtoken.exp
    // if(Date.now() == exp) return res.status.send({status : false, msg : "Your login session has expired, please login again."})

    let userId = decodedtoken.userId

    if(user){
       if(user != userId) return res.status(400).send({status : false, msg : "UserId does not match!"})
    }
    
     if(!decodedtoken){
       return  res.status(401).send({status:false, msg:"invalid token"})
     }
     next()
    }
    catch(error){
        res.status(401).send({status:false ,message:error})
    }
}






const authorize= async function(req,res,next){
    try{
        const token = req.headers["x-api-key"]
        let bookId = req.params.bookId

        if(!token) return res.status(400).send({status: false, msg : "Please provide a token!"})

        let decodedToken = JWT.verify(token, "Group-4")
        if(!decodedToken) return res.status(400).send({status : false, msg : "Token should be present!"})

        let userLoggedIn = decodedToken.userId

        let findUserId = await bookModel.findById(bookId)
        if(!findUserId) return res.status(404).send({status : false, msg : "No book found with this bookId"})

        let newUserId = findUserId.userId.toString()


        if(userLoggedIn !== newUserId) return res.status(401).send({status : false, msg : "You're not authorized!"})

        next()


        
    }catch(error){
        res.status(500).send({status:false ,message:error})
    }
}





module.exports.authenticate = authenticate
module.exports.authorize = authorize