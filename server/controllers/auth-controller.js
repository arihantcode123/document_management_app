const { TokenExpiredError } = require('jsonwebtoken');
const User = require('../models/auth-model')

const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(400).json({message: "Email already exists",type:"info"})
        }


        const userCreated = await User.create({ email, password })

        return res.status(200).send({
            message: "Login Successfull ✅",
            token: await userCreated.generateToken(),
            userId: userCreated._id.toString(),
            type:"success"
        })
    } catch (error) {
        res.send({message:"Internal Server Error ❌",type:"error"})
        
    }
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExist = await User.findOne({ email: email })

        if (!userExist) {
            return res.status(400).send({message:"Invalid Email or Password ❌",type:"error"})
        }

        const user = await userExist.comparePassword(password);
        if (user) {
            return res.status(200).send({
                message: "Login Successfull ✅",
                token: await userExist.generateToken(),
                userId: userExist._id.toString(),
                type:"success"
            })
        }
        else {
            return res.status(400).json({ message: "Invalid email or password ❌",type:"error"})
        }
    } catch (error) {
        res.send({message:"Internal Server Error ❌",type:"error"})
    }
}

const user = async (req, res) => {
    try {
        const userData = req.user;
        return res.status(200).json({userData});
    } catch (error) {
        console.log(error);
    }

}


module.exports = { register, login, user};