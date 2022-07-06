const bookModel = require("../models/bookModel")
const mongoose = require ("mongoose")
const ISBNs = require( 'isbn-validate' );
const moment = require("moment")

const createBook = async function (req, res){
    try{
        let data = req.body
        if(Object.keys(data).length == 0) return res.status(400).send({status:false, msg : "Please input data!"})
        let {title, excerpt,userId,ISBN,category,subCategory,releasedAt} = data
        
        if(!title)return res.status(400).send({status : false, msg : "Please insert title!"})
        let uniqueTitle = await bookModel.findOne({title : title})
        if(uniqueTitle) return res.status(409).send({status : false, msg : "Title already exists!"})

    
        if(!excerpt) return res.status(400).send({status : false, msg : "Excerpt should be present!"})

        
        if(!userId) return res.status(400).send({status : false, msg : "UserId should be present!"})
        let isValidId = mongoose.Types.ObjectId.isValid(userId)
        if(!isValidId) return res.status(400).send({status : false, msg : "The userId provided is invalid!"})

      
        if(!ISBN) return res.status(400).send({status : false, msg : "Please provide an ISBN!"})
        let validateISBN = ISBNs.Validate(ISBN)
        if(!validateISBN) return res.status(400).send({status : false, msg : "The ISBN provided is invalid, please provide with a valid ISBN!"})
        let uniqueISBN = await bookModel.findOne({ISBN : ISBN})
        if(uniqueISBN) return res.status(409).send({status : false, msg : "ISBN already exists!"})

        
        if(!category) return res.status(400).send({status : false, msg : "Please provide a category!"})

        
        if(!subCategory) return res.status(400).send({status : false, msg : "Please provide a subCategory!"})

        
        if(!releasedAt) return res.status(400).send({status : false, msg : "Please provide a release date!"})
        releasedAt = moment(releasedAt).format("YYYY-MM-DD")
        let isValidDateFormat = function (date) {
            let dateFormatRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/
            return dateFormatRegex.test(date)
        }
        if(!isValidDateFormat(releasedAt)) return res.status(400).send({status : false, msg : "Wrong date format!"})

        let create = await bookModel.create(data)
        if(!create) res.status(404).send({status : false, msg : "Book not found!"})

        res.status(201).send({status : true, msg : "Book created successfully!"})
    }catch(error){
        res.status(500).send({msg : error.message})
    }
}

module.exports.createBook = createBook