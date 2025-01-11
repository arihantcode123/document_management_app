const Document = require("../models/upload-model");

const checkUploadLimit = async (req, res, next) => {
    try {
        const { email } = req.body;

        // Fetch all documents for the user
        const userDocuments = await Document.find({ email });

        // Calculate total size of the user's documents
        const totalSize = userDocuments.reduce((acc, doc) => acc + (doc.document.size || 0), 0);

        // Convert bytes to megabytes
        const totalSizeInMB = totalSize / (1024 * 1024);

        

        if (totalSizeInMB > 20) {
            return res.status(400).json({ message: "Upload limit exceeded. Total storage cannot exceed 20 MB." ,type:"warning"});
        }

        next(); // Proceed to the upload handler if within the limit
    } catch (error) {
        // console.error("Error checking upload limit:", error);
        res.status(500).json({ message: "Internal server error ❌",type:"error" });
    }
};

module.exports = checkUploadLimit;
