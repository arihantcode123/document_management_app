const multer = require('multer');
const path = require('path');
const express=require('express');
const router=express.Router()
const {uploadFile,deleteDocument} = require('../controllers/upload-controller');
const checkUploadLimit = require('../middlewares/UploadLimit.middleware');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory to save files
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

router.post('/uploadFile', upload.single('document'),checkUploadLimit, uploadFile);
router.delete('/deleteDocument/:id',deleteDocument);


module.exports=router;