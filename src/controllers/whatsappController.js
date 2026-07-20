const { enviarParaDialogflow } = require('../services/dialogflowService');
const Appointment = require('../../src/Appointment');
async function processarMensagemWhatsApp(req, res) {
    try {
        const { de, texto } = req.body;

        if (!de || !texto) {
            return res.status(400).json({ erro: "Os campos 'de' e 'texto' são obrigatórios." });
        }

        console.log(`\n📬 [WhatsApp] Mensagem de ${de}: "${texto}"`);
        const dadosIA = await enviarParaDialogflow(texto, de);

        console.log(`🤖 [IA] Intent: ${dadosIA.intent}`);
        console.log(`💬 [IA] Resposta: "${dadosIA.respostaTexto}"`);
// === TESTE DE BANCO DE DADOS ===
    try {
        // Verificamos se a Ia detectou que a intenção do usuario é agendamento
        if(dadosIA.intent === 'Agendarconsulta' || dadosIA.intent === 'marcar_consulta' )
      console.log("📝 Nova intençao de agendamendo detectada. Salvando no banco...");

      const novoAgendamento = new Appointment({
        nome: dadosIA.nomeCliente || "Paciente sem nome", // Tenta pegar o nome extraido pela Ia, se nao houver usa o padrão
        telefone: de, // Usa o número de telefone de quem mandou a mensagem
        data: dadosIA.dataConsulta ? new Date(dadosIA.dataConsulta) : new Date() // Se a Ia achou uma data usa ela, se nao usa a de hoje
      });

      await novoAgendamento.save();
      console.log("💾 AGENDAMENTO REAL SALVO NO BANCO COM SUCESSO!");
    } catch (dbError) {
      console.error("❌ Falha ao salvar no teste de banco:", dbError.message);
    }
    // =====================================
        return res.status(200).json({
            sucesso: true,
            cliente: de,
            mensagemParaEnviar: dadosIA.respostaTexto + "\n\n Lembrete: Por favor, chegue com 15 minutos de antecedência e traga um documento oficial com foto"
        });

    } catch (error) {
        console.error("❌ Erro no controlador:", error);
        return res.status(500).json({ erro: "Erro interno no servidor." });
    }
}

module.exports = { processarMensagemWhatsApp };