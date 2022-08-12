const multer = require('multer');
const s3Storage = require('multer-sharp-s3');
const aws = require('aws-sdk');
const now = Date.now();
require('dotenv').config();


aws.config.update({
    accessKeyId: process.env.NEXT_PUBLIC_ENV_AWSACCESS,
    secretAccessKey: process.env.NEXT_PUBLIC_ENV_AWSSECRET,
    region: "us-east-2"
});

const s3 = new aws.S3();


const storage = s3Storage({
    s3: s3,
    Bucket: "soundshare-bucket",
    // metadata: function (req, file, cb) {
    //     cb(null, {fieldName: file.fieldname});
    //   },
    Key: function (req, file, cb) {
        cb(null,`${now}-${file.originalname}`)
      },
    resize: {
        width: 1000,
        height: 1000
    },
    ACL: "public-read"
});

const storage2 = s3Storage({
    s3,
    Bucket: "soundshare-bucket",
    ACL: "public-read",
    Key: function (req, file, cb) {
        cb(null, `${now}-${file.originalname}`)
      },
    resize: {
      width: 500,
      height: 500
    },
    max: true
});

const MIME_TYPE_WHOLE = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
    'image/svg+xml': 'svg',
    'audio/wav': 'wav',
    'audio/mp3': 'mp3',
    'audio/FLAC': 'FLAC',
    'audio/x-wav': 'wav',
    'audio/x-mp3': 'mp3',
    'audio/mpeg': 'mp3',

}

const fileUpload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const isValid = (!!MIME_TYPE_WHOLE[file.mimetype]);
        let error = isValid ? null : new Error('Invalid mime type!')
        cb(error, isValid);
    }
})
const fileUpload2 = multer({
    storage: storage2,
    fileFilter: (req, file, cb) => {
        const isValid = (!!MIME_TYPE_WHOLE[file.mimetype]);
        let error = isValid ? null : new Error('Invalid mime type!')
        cb(error, isValid);
    }
})


const deleteFromS3 = (req, res, next) => {
    const fileKey = req.query.filekey;

    let params = {
        Bucket: 'soundshare-bucket',
        Key: fileKey
    };

    s3.deleteObject(params, function(err, data) {
        if (err) {
          next(err);
        } else {
          next(null);
        }
    });
}

const deleteFromS3Fallback = (key, next) => {

    let params = {
        Bucket: 'soundshare-bucket',
        Key: key
    };

    s3.deleteObject(params, function(err, data) {
        if (err) {
          console.log(err);
          next(err);
        }
    });
}


const uploaders = {
    upload: fileUpload,
    userPicUpload: fileUpload2,
    deleteFile: deleteFromS3,
    deleteFileFallback: deleteFromS3Fallback,
    s3: s3
}

module.exports = uploaders;