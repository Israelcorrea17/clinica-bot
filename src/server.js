const express = require('express');
const connectDB = require('./database');
require('dotenv').config();
const { processarMensagemWhatsApp } = require('./controllers/whatsappController');

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
    return res.status(200).json({ status: "Servidor backend 100% ativo!" });
});

app.post('/webhook/whatsapp', processarMensagemWhatsApp);

const PORT = process.env.PORT || 3000;
// Conecta ao banco de dados MongoDB
connectDB();
app.listen(PORT, () => {
    console.log(`===========================================================`);
    console.log(`🚀 BACKEND DO BOT INICIALIZADO COM SUCESSO NA PORTA ${PORT}`);
    console.log(`🔗 Webhook pronto em: http://localhost:${PORT}/webhook/whatsapp`);
    console.log(`===========================================================`);
});