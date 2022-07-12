const isValid = function(value) {
    if(typeof (value) == "undefined" || typeof (value) == null) {return false}
    if(typeof (value) == "string" && (value).trim().length == 0) {return false}
    if(typeof (value) == 'number' && (value).toString().trim().length == 0){return false}
    return true
}

const reg = function(value){
return /^[A-Z a-z]+$/.test(value)
}

const emailRegex = function(value){
    return /^\w+([\.-]?\w+)@[a-z]\w+([\.-]?\w+)(\.\w{2,3})+$/.test(value)
}

const phoneRegex = function(value){
    return /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(value)
}

const ISBNRegex = function(value){
    return /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/.test(value)
}

const dateFormatRegex = function(value){
    return /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/.test(value)
}

module.exports.isValid = isValid
module.exports.reg = reg
module.exports.phoneRegex = phoneRegex
module.exports.emailRegex = emailRegex
module.exports.ISBNRegex = ISBNRegex
module.exports.dateFormatRegex = dateFormatRegex