const express = require('express');
const { createUser, getUsers } = require('../controllers/userController');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/',upload.single('image'), createUser);
router.get('/', getUsers);

module.exports = router;
