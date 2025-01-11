const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken')
const {Schema,model}=require('mongoose');

const signupSchema= new Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

signupSchema.pre('save',async function(next){

    const user = this;
    if(!user.isModified('password')){
        next();
    }

    try {
        const salt = await bcryptjs.genSaltSync(10);
        const hash_password = await bcryptjs.hash(user.password,salt)
        user.password=hash_password;
    } catch (error) {
        console.log(error);
        
    }

})

//generating jwt token for user authentication
signupSchema.methods.generateToken=async function(){
    try {
        return jwt.sign({
            userId:this._id.toString(),
            email:this.email,
            isAdmin:this.isAdmin
        },
        process.env.JWT_SECRET_KEY,
        {expiresIn:"30d"}
    )
    } catch (error) {
        console.log(error);
    }
}

//to compare password during login process
signupSchema.methods.comparePassword=async function(password){
    return bcryptjs.compare(password,this.password)
}

const User=new model('User',signupSchema);

module.exports=User;