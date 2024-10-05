const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const personagemRoutes = require('./routes/personagemRoutes');
const itemRoutes = require('./routes/itemRoutes');
const magiaRoutes = require('./routes/magiaRoutes');
const efeitoRoutes = require('./routes/efeitoRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar ao MongoDB', err));

// retirar quando entrar em produção
app.use(cors());
// Substitua por
/* app.use(cors({
 origin: 'https://seu-site.com', // Substitua pelo domínio do seu site
 methods: 'GET,POST',            // Permitir métodos
})); */

app.use(express.json());
app.use('/usuarios', userRoutes);
app.use('/personagens', personagemRoutes);
app.use('/itens', itemRoutes);
app.use('/magias', magiaRoutes);
app.use('/efeitos', efeitoRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});