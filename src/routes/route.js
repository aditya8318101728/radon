const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
const bookController = require("../controllers/bookController")





router.post('/register', userController.createUser)

router.post("/books", bookController.createBook)

router.post("/login", userController.userLogin)








router.all("/**", function (req, res) {
    res.status(404).send({
        status: false,
        msg: "The api you request is not available"
    })
})





module.exports = router;