const mongoose = require("mongoose")
const Object= mongoose.Schema.Types.ObjectId

const reviewSchema = new mongoose.Schema(
    {
        bookId: {
            type:Object,
            ref: "Book",
            required: true
        },
        reviewedBy: {
            type: String,
            required: true,
            default: "Guest",
            
        }, 
        reviewedAt: {
            type: Date,  
            required: true

        },
        rating: {
            type: Number,
            required: true,
            enum : [1, 2, 3, 4, 5]
            

        },
        review: {
            type: String

        },
        isDeleted: {
            type: Boolean,
            default: false
        },
    },
    
)
module.exports = mongoose.model("Review", reviewSchema)






// bookId: {ObjectId, mandatory, refs to book model},
//   reviewedBy: {string, mandatory, default 'Guest', value: reviewer's name},
//   reviewedAt: {Date, mandatory},
//   rating: {number, min 1, max 5, mandatory},
//   review: {string, optional}
//   isDeleted: {boolean, default: false},
// }