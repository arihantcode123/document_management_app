const Document= require('../models/upload-model')

const userDocument = async(req,res)=>{

    const {email} = req.body; 
    const userData = await Document.find({email})
    res.send(userData)
    // return res.send("successfully fetched all document")
}

const viewPage = async(req,res)=>{
    const {id} = req.params
    const document = await Document.find({_id:id})
    res.send(document[0])
    
}

module.exports = {userDocument,viewPage};