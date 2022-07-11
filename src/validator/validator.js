const isValid = function(value) {       //Ask TA
    if(typeof (value) == "undefined" || typeof (value) === null) {return false}
    if(typeof (value) == "string" && (value).trim().length == 0) {return false}
    if(typeof (value) == 'number' && (value).toString().trim().length == 0){return false}
    return true
}

const reg = function(value){
return /^[A-Z a-z]+$/.test(value)
}



// const jwtValidation = function(x){
//     return /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/.test(x)
// }

module.exports.isValid = isValid
module.exports.reg = reg
//module.exports.jwtValidation = jwtValidation
