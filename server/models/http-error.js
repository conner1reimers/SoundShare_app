// class HttpError extends Error {
//     constructor(message, errorCode) {
//         super(message);
//         this.code = errorCode
//     }
// }

const HttpError = (msg, code, res) => {
   return res.status(code).json({message: msg })
}


module.exports = HttpError