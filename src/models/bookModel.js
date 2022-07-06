const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({

    title: {
        type: String,
        require: true,
        unique: true
    },

    excerpt: {
        type: String,
        require: true
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        require: true
    },

    ISBN: {
        type: String,
        require: true,
        unique: true
    },

    category: {
        type: String,
        require: true
    },

    subcategory: {
        type: String,
        require: true
    },

    review: {
        type: String,
        default: 0,
        comment: String
    },

    deletedAt: {
        type: date
    },

    isDeleted: {
        type: Boolean,
        default: false
    },

    releasedAt: {
        type: date,
        require: true,
    }

}, { timestamp: true })

module.exports = mongoose.model("bookModel", bookSchema)






// title: {string, mandatory, unique},
// excerpt: {string, mandatory},
// userId: {ObjectId, mandatory, refs to user model},
// ISBN: {string, mandatory, unique},
// category: {string, mandatory},
// subcategory: [string, mandatory],
// reviews: {number, default: 0, comment: Holds number of reviews of this book},
// deletedAt: {Date, when the document is deleted},
// isDeleted: {boolean, default: false},
// releasedAt: {Date, mandatory, format("YYYY-MM-DD")},
// createdAt: {timestamp},
// updatedAt: {timestamp},