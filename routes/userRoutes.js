const express = require('express');
const { salvar, pegarTudo } = require('../controllers/userController');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/salvar',upload.single('image'), salvar);
router.get('/', pegarTudo);

module.exports = router;
