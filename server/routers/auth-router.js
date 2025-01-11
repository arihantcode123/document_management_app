const express=require('express');
const router=express.Router()
const authController=require('../controllers/auth-controller')
const validate = require('../middlewares/validate-middleware')
const authMiddleware=require('../middlewares/auth-middleware')
const schemaMiddleware = require('../validations/auth-validation')

router.route('/register').post(validate(schemaMiddleware.loginSchema),authController.register);
router.route('/login').post(validate(schemaMiddleware.loginSchema),authController.login);
router.route('/user').get(authMiddleware,authController.user);

module.exports=router;