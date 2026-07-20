// 1. Simulamos um banco de dados que demora 2 segundos para responder
function salvarNoBancoDeDados(nome) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Paciente " + nome + " salvo com sucesso no MongoDB!");
        }, 2000); // 2000 ms = 2 segundos
    });
}

// 2. Criamos uma função ASSÍNCRONA para rodar nosso robô
async function executarBot() {
    console.log("1. Recebi a mensagem do paciente...");
    console.log("2. Enviando os dados para a nuvem...");

    // O "await" faz o código parar aqui e esperar os 2 segundos
    const respostaDoBanco = await salvarNoBancoDeDados("Israel"); 

    console.log("3.", respostaDoBanco);
    console.log("4. Mandei a mensagem de confirmação no WhatsApp!");
}

// 3. Executamos a função
executarBot();