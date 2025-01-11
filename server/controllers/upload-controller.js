const Document = require("../models/upload-model");
const cloudinary = require('../utils/cloudinary')
const fs = require('fs');



const uploadFile = async (req, res) => {
    try {
        const { name, description, email } = req.body;

        // Check if the uploaded file is an image
        const allowedMimeTypes = ['image/jpeg', 'image/png'];

        if (!allowedMimeTypes.includes(req.file.mimetype)) {
            return res.status(400).send({ message: 'Only image files (JPEG, PNG) are allowed.', type: "info" });
        }

        const result = await cloudinary.uploader.upload(req.file.path)
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
        fs.unlinkSync(req.file.path);
        res.status(201).send({ message: 'File uploaded successfully ✅', type: "success" });
    } catch (error) {
        if (req.file && req.file.path) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).send({ error: 'Internal server error ❌', type: "error" });
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