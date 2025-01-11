const validate=(schema)=>async(req,res,next)=>{
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body=parseBody;
        next();
    } catch (err) {
        const status=422;
        const message="Fill input properly";
        const extraDetails=err.errors[0].message;
        res.status(status).send({message:extraDetails,type:"error"})
    }
}

module.exports=validate;