const { sessionClient, projectId } = require('../config/dialogflowConfig');

async function enviarParaDialogflow(textoInput, sessionId) {
    try {
        if (!projectId || projectId === 'teu-project-id-aqui') {
            console.log("⚠️ [Aviso] Dialogflow não configurado. Executando simulação local.");
            return simularRespostaLocal(textoInput);
        }

        const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);
        const request = {
            session: sessionPath,
            queryInput: { text: { text: textoInput, languageCode: 'pt-BR' } },
        };

        const responses = await sessionClient.detectIntent(request);
        return {
            respostaTexto: responses[0].queryResult.fulfillmentText,
            intent: responses[0].queryResult.intent ? responses[0].queryResult.intent.displayName : 'Default Fallback Intent',
            parametros: responses[0].queryResult.parameters ? responses[0].queryResult.parameters.fields : {}
        };
    } catch (error) {
        console.error('❌ Erro no Dialogflow Service:', error);
        throw error;
    }
}

function simularRespostaLocal(texto) {
    const t = texto.toLowerCase();
    if (t.includes('marcar') || t.includes('consulta') || t.includes('agendar')) {
        return { respostaTexto: "Para qual dia você deseja agendar a sua consulta?", intent: "marcar_consulta", parametros: {} };
    }
    if (t.includes('endereço') || t.includes('onde fica')) {
        return { respostaTexto: "📍 Ficamos na Av. Paulista, 1000 - Conjunto 52.", intent: "saber_endereco", parametros: {} };
    }
    return { respostaTexto: "Olá! Como posso ajudar na clínica hoje?", intent: "Default Welcome Intent", parametros: {} };
}

module.exports = { enviarParaDialogflow };