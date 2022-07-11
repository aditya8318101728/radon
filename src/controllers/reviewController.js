const reviewModel = require("../models/reviewModel.js")
const bookModel = require("../models/bookModel.js")
const mongoose= require("mongoose")
const moment = require("moment")



const createReview = async function (req, res) {
    try{
    let  bookId  = req.params.bookId;
    let data = req.body
    let { reviewedBy, rating, review } = data;
   
    let isValidbookID = mongoose.isValidObjectId(bookId); 
    if (!isValidbookID) return res.status(400).send({ status: false, message: "Book Id is Not Valid" });
    
    let findBook = await bookModel.findOne({bookId: bookId, isDeleted: false,});
    if (!findBook) return res.status(404).send({status: false,message: "No such Book is Present as Per BookID"});
    
  
    if (!reviewedBy) return res.status(400).send({status: false, msg: "please enter valid name for reviewer!!!"});
    
    
    if (!rating) return res.status(400).send({ status: false, message: "rating is Missing" });
  
    if (!(rating >= 1 && rating <= 5))
      return res.status(400).send({ status: false, message: " Please enter Rating between [1-5]" });
  

      data.reviewedAt = Date.now()

    data.bookId = bookId.toString();
    
     
    let reviewData = await reviewModel.create(data)
    let updated = await bookModel.findByIdAndUpdate(bookId, { $inc: { reviews: 1 },})
    return res.status(201).send({ status: true, message: "Success", data: updated, reviewData});

  }catch(error){
    res.status(500).send({msg : error.message})
  }
}















const updateReview = async function (req, res){
    try{
        let bookId = req.params.bookId
        let reviewId = req.params.reviewId

        let review = req.body.review
        let rating = req.body.rating
        let reviewedBy = req.body.reviewedBy

        if(rating === String) return res.status(403).send({status : false, msg : "Forbidden data type of ratings!"})

        if(![1,2,3,4,5].includes(rating)) return res.status(400).send({status : false, msg : "Ratings should include numbers ranging from 1 to 5 only! "})

        let bookExists = await bookModel.findOne({bookId, isDeleted : false})
        if(!bookExists) return res.status(404).send({status : false, msg : "Book not found or has been deleted!"})

        let reviewExists = await reviewModel.findOne({reviewId, isDeleted : false})
        if(!reviewExists){
            return res.status(404).send({status : false, msg : "The reviewId you're trying to access does not exist!"})
        }else{
            let updateReview = await reviewModel.findOneAndUpdate({_id : reviewId},
             {$set: {review : review, rating : rating, reviewedBy : reviewedBy} }, {new :true})
             res.status(200).send({status : true, msg : "Book review updated!", data : updateReview})
        }
    }catch(error){
        res.status(500).send({msg : error.message})
    }
}








const deleteReview = async function (req, res) {
    try {
        const bookId = req.params.bookId;
        const reviewId = req.params.reviewId;

        let bookIdCheck = await bookModel.findById({ _id: bookId });
        if (!bookId) return res.status(400).send({ status: false, message: "BookId does not exist" });


        let reviewIdCheck = await reviewModel.findById({ _id: reviewId });
        if (!reviewId) return res.status(400).send({ status: false, message: "ReviewId does not exist" })
        if (bookIdCheck.isDeleted == true || reviewIdCheck.isDeleted == true) return res.status(400).send({ status: false, message: "Book or Book review does not exist" })

        if (reviewIdCheck.isDeleted == false) {
            let update = await reviewModel.findOneAndUpdate({ _id: reviewId },
                {$set: { isDeleted: true }}, { new: true })
            let deleteReviewCount = await bookModel.findOneAndUpdate({ _id: bookIdCheck._id }, { $inc: { "reviews": -1 } })
            console.log(deleteReviewCount)
            return res.status(200).send({ status: true, data: update })
        }

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}







module.exports.createReview = createReview
module.exports.updateReview = updateReview
module.exports.deleteReview = deleteReview