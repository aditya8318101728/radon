const express = require("express")
const router = express.Router() //defines route path
const userController = require("../controllers/userController")
const bookController = require("../controllers/bookController")
const reviewController = require("../controllers/reviewController.js")
const MW = require("../middleware/auth.js")






router.post('/register', userController.createUser)

router.post("/books", MW.authenticate, bookController.createBook)

router.post("/login",  userController.userLogin)

router.get("/books", MW.authenticate, bookController.getBooks)

router.get("/books/:bookId", MW.authenticate, bookController.getBooksById)

router.put("/books/:bookId", MW.authenticate, MW.authorize, bookController.updateBooks)

router.delete("/books/:bookId", MW.authenticate, MW.authorize, bookController.deleteBooks)

router.post("/books/:bookId/review", reviewController.createReview)

router.put("/books/:bookId/review/:reviewId", MW.authenticate, MW.authorize, reviewController.updateReview)

router.delete("/books/:bookId/review/:reviewId", MW.authenticate, MW.authorize, reviewController.deleteReview)






router.all("/**", function (req, res) {
    res.status(404).send({
        status: false,
        msg: "The api you requested is not available!"
    })
})





module.exports = router;