const ReviewModel= require("../models/reviewModel")
const BookModel= require("../models/bookModel")
const mongose= require("mongoose")
const createReview = async function (req, res) {
    let { bookId } = req.params;
    let { reviewedBy, reviewedAt, rating, review } = req.body;
    if (Object.keys(req.params).length == 0) {
      return res
        .status(400)
        .send({ status: false, message: "please enter some DETAILS!!!" });
    }
    let isValidbookID = mongoose.isValidObjectId(bookId); 
    if (!isValidbookID) {
      return res
        .status(400)
        .send({ status: false, message: "Book Id is Not Valid" });
    }
    let findBook = await BookModel.findOne({
      bookId: bookId,
      isDeleted: false,
    });
    if (!findBook) {
      return res.status(404).send({
        status: false,
        message: "No such Book is Present as Per BookID",
      });
    }
  
    if (!reviewedBy) {
      if (!validate(reviewedBy)) {
        return res.status(400).send({
          status: false,
          message: "please enter valid name for reviewer!!!",
        });
      }
    }
    if (!rating)
      return res
        .status(400)
        .send({ status: false, message: "rating is Missing" });
  
    if (!(rating >= 1 && rating <= 5))
      return res
        .status(400)
        .send({ status: false, message: " Plz enter Rating between [1-5]" });
  
    if (!reviewedAt)
      return res
        .status(400)
        .send({ status: false, message: "reviewedAt date is Missing" });
  
    let validDate = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
    if (!validDate.test(reviewedAt)) {
      return res
        .status(400)
        .send({ status: false, message: " Plz enter Valid Date as YYYY-MM-DD" });
    }
  
    req.body.bookId = bookId.toString();
    let reviewDate = await ReviewModel.create(req.body);
    let updated = await BookModel.findByIdAndUpdate(bookId, {
      $inc: { reviews: 1 },
    });
    return res
      .status(201)
      .send({ status: true, message: "Success", data: updated ,reviewDate});
  };
  module.exports.createReview=createReview