const bookModel = require("../models/bookModel")
const mongoose = require ("mongoose")

const moment = require("moment")
const userModel = require("../models/userModel")
const ReviewModel=require("../models/reviewModel")

const createBook = async function (req, res){
    try{
        let data = req.body
        if(Object.keys(data).length == 0) return res.status(400).send({status:false, msg : "Please input data!"})

        let {title, excerpt,userId,ISBN,category,subcategory,releasedAt} = data
        
        if(!title)return res.status(400).send({status : false, msg : "Please insert title!"})
        let uniqueTitle = await bookModel.findOne({title : title})
        if(uniqueTitle) return res.status(409).send({status : false, msg : "Title already exists!"})

    
        if(!excerpt) return res.status(400).send({status : false, msg : "Excerpt should be present!"})

        
        if(!userId) return res.status(400).send({status : false, msg : "UserId should be present!"})
        let isValidId = mongoose.Types.ObjectId.isValid(userId)
        if(!isValidId) return res.status(400).send({status : false, msg : "The userId provided is invalid!"})

        
        if(!ISBN) return res.status(400).send({status : false, msg : "Please provide an ISBN!"})
        let isbnRegex = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/
        if(!isbnRegex.test(ISBN)){
            return res.status(400).send({status : false, msg : "Please provide a valid ISBN!"})

        }
        let uniqueISBN = await bookModel.findOne({ISBN : ISBN})
        if(uniqueISBN) return res.status(409).send({status : false, msg : "ISBN already exists!"})

        
        if(!category) return res.status(400).send({status : false, msg : "Please provide a category!"})

        
        if(!subcategory) return res.status(400).send({status : false, msg : "Please provide a subCategory!"})

        
        if(!releasedAt) return res.status(400).send({status : false, msg : "Please provide a release date!"})
        releasedAt = moment(releasedAt).format("YYYY-MM-DD")
        let isValidDateFormat = function (date) {
            let dateFormatRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/
            
            return dateFormatRegex.test(date)
        }
        if(!isValidDateFormat(releasedAt)) return res.status(400).send({status : false, msg : "Wrong date format!"})

        let bookCreated = await bookModel.create(data)
        if(!bookCreated) res.status(404).send({status : false, msg : "Book already exists!"})

        res.status(201).send({status : true, msg : "Book created successfully!", bookCreated})
    }catch(error){
        res.status(500).send({msg : error.message})
    }
}








const getBooks = async function (req, res){
    try{
     let data = req.query
     if(Object.keys(data).length == 0) return res.status(400).send({stastus : false, msg : "Provide inputs in query!"})

     
     let userId=data.userId
     let category=data.category
     let subCategory=data.subCategory



     if(!userId) return res.status(400).send({stastus : false, msg : "Provide a userId!"})
     let idExists = await userModel.findOne({_id : userId})
     if(!idExists) return res.status(404).send({status : false, msg : "UserId not found!"})

     let isValid = mongoose.Types.ObjectId.isValid(data.userId)
        if (!isValid) return res.status(400).send({ status: false, msg: "Enter valid objectID" })

        if(!category) return res.status(400).send({stastus : false, msg : "Provide a category!"})

        if(!subCategory) return res.status(400).send({stastus : false, msg : "Provide a subCategory!"})

     let getBooks = await bookModel.find({isDeleted : false},data).select({_id : 1, title : 1, excerpt : 1, userId : 1, category : 1, releasedAt : 1, reviews : 1})
     

                                            
     res.status(200).send({status : true, msg : "Books found!",getBooks})

    }catch(error){
        res.status(500).send({msg : error.message})
    }
}
const getBooksById = async function (req, res) {
    try {
      let bookId = req.params.bookId;
      if (!bookId) {
        return res
          .status(400)
          .send({ status: false, message: "Please give book id" });
      }
      let isValidbookID = mongoose.isValidObjectId(bookId);
      if (!isValidbookID) {
        return res
          .status(400)
          .send({ status: false, message: "Book Id is Not Valid" });
      }
  
      const book = await bookModel.find({
        _id: bookId,
        isDeleted: false,
      }).select({ __v: 0, ISBN: 0 }); //check id exist in book model
      if (!book)
        return res
          .status(404)
          .send({ status: false, message: "BookId do not exist" });
    
    const Review= await  ReviewModel.find({bookId:data._id})
     
    if(Review){
        book.Review=Review
    }
   return res
        .status(200)
        .send({ status: true, message: "Book Lists", data: book });
    } catch (err) {
      return res.status(500).send({ status: false, message: err.message });
    }
  };
module.exports.createBook = createBook
module.exports.getBooks = getBooks
module.exports.getBooksById= getBooksById