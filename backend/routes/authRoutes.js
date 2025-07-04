import express from 'express';
import { registerUser, loginUser, getProfile, logoutUser } from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();
router.get('/test', (req, res)=>{
  res.send("Api is working")
})
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getProfile);
router.get('/logout', logoutUser);

export default router;
