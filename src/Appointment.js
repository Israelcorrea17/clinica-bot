const mongoose = require('mongoose');

// Criando a Schema
const AppointmentSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true // Isso significa que o nome é obrigatório!
  },
  telefone: {
    type: String,
    required: true
  },
  data: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    default: 'pendente' // Se não enviarmos um status, ele começa como 'pendente'
  }
});

// Exporta o modelo para podermos usar em outras partes do sistema
module.exports = mongoose.model('Appointment', AppointmentSchema);