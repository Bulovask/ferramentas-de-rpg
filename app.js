const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config(); // Para usar variáveis de ambiente

const app = express();
const PORT = process.env.PORT || 3000;

// Conectando ao MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar ao MongoDB', err));

app.use(express.json()); // Para interpretar JSON
app.use('/users', userRoutes); // Rota para os usuários

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});