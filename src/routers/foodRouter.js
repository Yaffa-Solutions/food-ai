const express = require('express');
const multer = require('multer');
const authenticateToken = require('../../middleware/auth');
const { addFood } = require('../controllers/food');
const {getFoodUser}=require('../controllers/food')

const router = express.Router();
const upload = multer();

router.get("/myfoods", authenticateToken, getFoodUser )
router.post('/add', authenticateToken, upload.single('image'), addFood);

module.exports = router;