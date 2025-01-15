const Document = require("../models/upload-model");
const cloudinary = require('../utils/cloudinary')
const fs = require('fs');



const uploadFile = async (req, res) => {
    try {
        const { name, description, email } = req.body;
        console.log("after getting name email etc");
        
        // Check if the uploaded file is an image
        const allowedMimeTypes = ['image/jpeg', 'image/png'];

        if (!allowedMimeTypes.includes(req.file.mimetype)) {
            return res.status(400).send({ message: 'Only image files (JPEG, PNG) are allowed.', type: "info" });
        }

        console.log("after checking mime type");
        

        const result = await cloudinary.uploader.upload(req.file.path)
        console.log("after uploading to cloudinary");
        console.log(result);
        
        await Document.create({
            email,
            name,
            description,
            document: {
                filename: req.file.filename,
                contentType: req.file.mimetype,
                size: req.file.size,
                path: req.file.path,
                url: result.url
            },
        });

        console.log("after creating document");
        
        fs.unlinkSync(req.file.path);

        console.log("after deleting file and just before response");
        
        return res.status(201).send({ message: 'File uploaded successfully ✅', type: "success" });
    } catch (error) {
        console.log(error);
        
        if (req.file && req.file.path) {
            fs.unlinkSync(req.file.path);
        }
        return res.status(500).send({ error: 'Internal server error ❌', type: "error" });
    }
};

const deleteDocument = async (req, res) => {
    try {
        const { id } = req.params;
        await Document.findByIdAndDelete(id);
        res.status(200).json({ message: "Document deleted successfully ✅", type: "success" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete document ❌", type: "errror" });
    }
}

module.exports = { uploadFile, deleteDocument }