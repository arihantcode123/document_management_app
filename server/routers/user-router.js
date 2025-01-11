const express = require('express')
const {userDocument,viewPage} = require('../controllers/user-controller')
const router = express.Router()

router.route('/fetchAllDocument').post(userDocument)
router.route('/fetchOneDocument/:id').get(viewPage)

module.exports=router