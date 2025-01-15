require('dotenv').config()
const express = require("express")
const connectDB=require('./utils/db');
const app = express()
const multer = require('multer')
const authRoute = require('./routers/auth-router')
const uploadRoute = require('./routers/upload-router')
const userRoute = require('./routers/user-router')
const cors = require('cors');
const path = require('path');


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/'); // Specify destination folder
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname); // Save file with original name
//     },
// });

const corsOption = {
    origin: "https://document-management-app-fyy6.onrender.com",
    methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials: true,
}

const _dirname = path.resolve();

app.use(cors(corsOption));
app.use(express.json())
app.use('/api/auth',authRoute)
app.use('/api/upload',uploadRoute)
app.use('/api/user',userRoute)
app.use(express.static('/uploads'));

app.use(express.static(path.join(_dirname, "/client/dist")));
app.get("*", (_, res) => {
    res.sendFile(path.resolve(_dirname, "client", "dist", "index.html"));
})



const PORT=process.env.PORT || 5000;
connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("server is running at port ",PORT);
    })
})