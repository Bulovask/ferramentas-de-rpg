const express = require('express');
const { salvar, pegarTudo } = require('../controllers/efeitoController');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/',upload.single('image'), salvar);
router.get('/', pegarTudo);

module.exports = router;
