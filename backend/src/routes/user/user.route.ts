import express from 'express'

const router = express.Router()

import { signUp , signIn , verifyToken, updateProfile } from '../../controllers/user/userController'
import { authMiddleware } from '../../middleware/authMiddleware'
import { upload } from '../../config/cloudinary'
import { loginAdmin } from '../../controllers/admin/adminController'

router.post('/register',signUp)
router.post('/login',signIn)
router.get('/verify',authMiddleware,verifyToken)
router.put('/profile',authMiddleware,upload.single('photo') ,updateProfile)

//admin
router.post('/admin/login',loginAdmin)


export default router