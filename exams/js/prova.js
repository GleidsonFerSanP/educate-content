// ===== CONFIGURAÇÃO WEB3FORMS =====
const WEB3FORMS_CONFIG = {
  accessKey: "72e5e862-5d0b-4ef9-958d-ff4ab503362e",
  recipientEmail: "gleidson.ferreirasantos@gmail.com",
};

// ===== DADOS DA PROVA =====
const PROVA_DATA = {
  questoes: [
    {
      id: 1,
      enunciado: "Complete a pergunta corretamente: '_____ my helmet?'",
      alternativas: [
        { letra: "A", texto: "Where's" },
        { letra: "B", texto: "What's" },
        { letra: "C", texto: "Who's" },
        { letra: "D", texto: "When's" },
      ],
      gabarito: "A",
    },
    {
      id: 2,
      enunciado:
        "Seu amigo pergunta: 'Where's the hammer?' O martelo está dentro da caixa de ferramentas. Qual é a resposta correta?",
      alternativas: [
        { letra: "A", texto: "It's on the toolbox" },
        { letra: "B", texto: "It's in the toolbox" },
        { letra: "C", texto: "It's under the toolbox" },
        { letra: "D", texto: "It's at the toolbox" },
      ],
      gabarito: "B",
    },
    {
      id: 3,
      enunciado:
        "Qual preposição usamos quando algo está em cima de uma superfície?",
      alternativas: [
        { letra: "A", texto: "IN" },
        { letra: "B", texto: "UNDER" },
        { letra: "C", texto: "ON" },
        { letra: "D", texto: "AT" },
      ],
      gabarito: "C",
    },
    {
      id: 4,
      enunciado:
        "A prancha de surf está embaixo da mesa. Como você responde 'Where's the surfboard?'",
      alternativas: [
        { letra: "A", texto: "It's on the table" },
        { letra: "B", texto: "It's in the table" },
        { letra: "C", texto: "It's at the table" },
        { letra: "D", texto: "It's under the table" },
      ],
      gabarito: "D",
    },
    {
      id: 5,
      enunciado: "Escolha a frase CORRETA em inglês:",
      alternativas: [
        { letra: "A", texto: "The helmet is in the garage" },
        { letra: "B", texto: "The helmet in garage" },
        { letra: "C", texto: "The helmet are in the garage" },
        { letra: "D", texto: "Helmet is on garage" },
      ],
      gabarito: "A",
    },
    {
      id: 6,
      enunciado:
        "Você encontra um livro sobre o sofá. Como você diz isso em inglês?",
      alternativas: [
        { letra: "A", texto: "The book is under the sofa" },
        { letra: "B", texto: "The book is on the sofa" },
        { letra: "C", texto: "The book is in the sofa" },
        { letra: "D", texto: "The book is at the sofa" },
      ],
      gabarito: "B",
    },
    {
      id: 7,
      enunciado: "Analise as frases abaixo. Qual está INCORRETA?",
      alternativas: [
        { letra: "A", texto: "Where's my helmet?" },
        { letra: "B", texto: "It's in the box" },
        { letra: "C", texto: "The hammer is under the table" },
        { letra: "D", texto: "Where's is the surfboard?" },
      ],
      gabarito: "D",
    },
    {
      id: 8,
      enunciado:
        "Se algo está guardado dentro de um armário fechado, qual preposição você deve usar?",
      alternativas: [
        { letra: "A", texto: "ON - porque está no armário" },
        { letra: "B", texto: "UNDER - porque está escondido" },
        { letra: "C", texto: "AT - porque está no lugar" },
        { letra: "D", texto: "IN - porque está dentro dele" },
      ],
      gabarito: "D",
    },
    {
      id: 9,
      enunciado:
        "Seu amigo pergunta onde está o capacete e você responde: 'It's on the shelf'. O que isso significa?",
      alternativas: [
        { letra: "A", texto: "O capacete está embaixo da prateleira" },
        { letra: "B", texto: "O capacete está na prateleira (em cima)" },
        { letra: "C", texto: "O capacete está dentro da prateleira" },
        { letra: "D", texto: "O capacete está ao lado da prateleira" },
      ],
      gabarito: "B",
    },
    {
      id: 10,
      enunciado:
        "Complete corretamente o diálogo: <br><br>Person A: 'Where's my hammer?'<br>Person B: '_____ the toolbox, _____ the table.'",
      alternativas: [
        { letra: "A", texto: "It's on / under" },
        { letra: "B", texto: "It's in / on" },
        { letra: "C", texto: "Is in / under" },
        { letra: "D", texto: "It's under / in" },
      ],
      gabarito: "B",
    },
  ],
};

// ===== ESTADO DA APLICAÇÃO =====
const Estado = {
  nomeAluno: "",
  respostas: {},
  provaSubmetida: false,
  telaAtual: "nome",
};

// ===== STORAGE (LocalStorage) =====
const Storage = {
  salvar: () => {
    localStorage.setItem("prova_licao5", JSON.stringify(Estado));
  },

  carregar: () => {
    const dados = localStorage.getItem("prova_licao5");
    if (dados) {
      const dadosCarregados = JSON.parse(dados);
      Object.assign(Estado, dadosCarregados);
      return true;
    }
    return false;
  },

  limpar: () => {
    localStorage.removeItem("prova_licao5");
  },
};

// ===== SERVIÇO DE EMAIL =====
const EmailService = {
  enviar: async (dados) => {
    try {
      // Formatar detalhes das questões
      const detalhesFormatados = dados.detalhes
        .map(
          (d) =>
            `Questão ${d.numero}: ${
              d.correto ? "✓ CORRETA" : "✗ ERRADA"
            } | Resposta do aluno: ${
              d.respostaAluno || "Não respondida"
            } | Gabarito: ${d.gabarito}`
        )
        .join("\n");

      // Criar mensagem formatada
      const mensagem = `
📝 RESULTADO DA PROVA - LIÇÃO 5
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👨‍🎓 Aluno: ${dados.nomeAluno}
📅 Data: ${new Date().toLocaleString("pt-BR")}

📊 DESEMPENHO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Nota: ${dados.nota}/${PROVA_DATA.questoes.length}
📈 Percentual: ${dados.porcentagem.toFixed(1)}%
✓ Acertos: ${dados.acertos}
✗ Erros: ${dados.erros}

📋 DETALHAMENTO DAS QUESTÕES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${detalhesFormatados}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 Sistema de Avaliação - Isabella Website
      `;

      // Enviar via Web3Forms
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_CONFIG.accessKey,
          subject: `📝 Prova Lição 5 - ${dados.nomeAluno} - Nota: ${dados.nota}/${PROVA_DATA.questoes.length}`,
          from_name: "Sistema de Provas - Isabella",
          email: WEB3FORMS_CONFIG.recipientEmail,
          message: mensagem,
        }),
      });

      const result = await response.json();

      if (result.success) {
        return { success: true, response: result };
      } else {
        throw new Error(result.message || "Erro ao enviar email");
      }
    } catch (error) {
      console.error("Erro ao enviar email:", error);
      return { success: false, error };
    }
  },
};

// ===== NAVEGAÇÃO ENTRE TELAS =====
const Navegacao = {
  irPara: (nomeTela) => {
    // Ocultar todas as telas
    document.querySelectorAll(".tela").forEach((tela) => {
      tela.classList.remove("ativa");
    });

    // Mostrar tela solicitada
    const tela = document.getElementById(`tela-${nomeTela}`);
    if (tela) {
      tela.classList.add("ativa");
      Estado.telaAtual = nomeTela;
      Storage.salvar();

      // Scroll para o topo
      window.scrollTo(0, 0);
    }
  },
};

// ===== TELA 1: IDENTIFICAÇÃO =====
const TelaIdentificacao = {
  init: () => {
    const inputNome = document.getElementById("nome-aluno");
    const btnIniciar = document.getElementById("btn-iniciar");
    const erroNome = document.getElementById("erro-nome");

    // Carregar nome salvo se existir
    if (Estado.nomeAluno) {
      inputNome.value = Estado.nomeAluno;
    }

    // Validar ao digitar
    inputNome.addEventListener("input", () => {
      erroNome.classList.remove("visivel");
      inputNome.style.borderColor = "";
    });

    // Permitir Enter para iniciar
    inputNome.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        btnIniciar.click();
      }
    });

    btnIniciar.addEventListener("click", () => {
      const nome = inputNome.value.trim();

      if (nome.length < 3) {
        erroNome.textContent =
          "Por favor, digite seu nome completo (mínimo 3 caracteres)";
        erroNome.classList.add("visivel");
        inputNome.style.borderColor = "var(--cor-erro)";
        inputNome.focus();
        return;
      }

      Estado.nomeAluno = nome;
      Storage.salvar();

      // Tocar som de início
      tocarSom(600, 100);

      // Ir para tela de questões
      Navegacao.irPara("questoes");
      TelaQuestoes.renderizar();
    });
  },
};

// ===== TELA 2: QUESTÕES =====
const TelaQuestoes = {
  renderizar: () => {
    // Exibir nome do aluno
    document.getElementById("nome-display").textContent = Estado.nomeAluno;

    // Renderizar questões
    const container = document.getElementById("lista-questoes");
    container.innerHTML = "";

    PROVA_DATA.questoes.forEach((questao) => {
      const questaoCard = TelaQuestoes.criarQuestaoCard(questao);
      container.appendChild(questaoCard);
    });

    // Atualizar progresso
    TelaQuestoes.atualizarProgresso();

    // Configurar botões
    TelaQuestoes.configurarBotoes();
  },

  criarQuestaoCard: (questao) => {
    const card = document.createElement("div");
    card.className = "questao-card";
    card.id = `questao-${questao.id}`;

    // Marcar como respondida se já tiver resposta
    if (Estado.respostas[questao.id]) {
      card.classList.add("respondida");
    }

    card.innerHTML = `
            <div class="questao-header">
                <div class="questao-numero">${questao.id}</div>
                <div class="questao-enunciado">${questao.enunciado}</div>
            </div>
            <div class="alternativas">
                ${questao.alternativas
                  .map(
                    (alt) => `
                    <div class="alternativa">
                        <input 
                            type="radio" 
                            id="q${questao.id}-${alt.letra}" 
                            name="questao-${questao.id}" 
                            value="${alt.letra}"
                            ${
                              Estado.respostas[questao.id] === alt.letra
                                ? "checked"
                                : ""
                            }
                            ${Estado.provaSubmetida ? "disabled" : ""}
                        >
                        <label for="q${questao.id}-${alt.letra}">
                            <span class="radio-custom"></span>
                            <span class="letra-alternativa">${alt.letra})</span>
                            <span>${alt.texto}</span>
                        </label>
                    </div>
                `
                  )
                  .join("")}
            </div>
        `;

    // Adicionar event listeners para salvar respostas
    if (!Estado.provaSubmetida) {
      card.querySelectorAll('input[type="radio"]').forEach((radio) => {
        radio.addEventListener("change", (e) => {
          Estado.respostas[questao.id] = e.target.value;
          Storage.salvar();

          // Marcar card como respondida
          card.classList.add("respondida");

          // Tocar som
          tocarSom(400, 50);

          // Atualizar progresso
          TelaQuestoes.atualizarProgresso();
        });
      });
    }

    return card;
  },

  atualizarProgresso: () => {
    const totalRespondidas = Object.keys(Estado.respostas).length;
    const porcentagem = (totalRespondidas / PROVA_DATA.questoes.length) * 100;

    document.getElementById("questoes-respondidas").textContent =
      totalRespondidas;
    document.getElementById("barra-preenchida").style.width = `${porcentagem}%`;

    // Habilitar/desabilitar botão submeter
    const btnSubmeter = document.getElementById("btn-submeter");
    if (totalRespondidas === PROVA_DATA.questoes.length) {
      btnSubmeter.disabled = false;
    } else {
      btnSubmeter.disabled = true;
    }
  },

  configurarBotoes: () => {
    const btnRevisar = document.getElementById("btn-revisar");
    const btnSubmeter = document.getElementById("btn-submeter");

    btnRevisar.addEventListener("click", () => {
      const primeiraVazia = PROVA_DATA.questoes.find(
        (q) => !Estado.respostas[q.id]
      );
      if (primeiraVazia) {
        document.getElementById(`questao-${primeiraVazia.id}`).scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      } else {
        // Scroll para o topo
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      tocarSom(500, 50);
    });

    btnSubmeter.addEventListener("click", () => {
      Modal.abrir();
    });
  },
};

// ===== MODAL DE CONFIRMAÇÃO =====
const Modal = {
  abrir: () => {
    const totalRespondidas = Object.keys(Estado.respostas).length;
    const faltam = PROVA_DATA.questoes.length - totalRespondidas;

    let mensagem = "";
    if (faltam > 0) {
      mensagem = `Você respondeu ${totalRespondidas} de ${PROVA_DATA.questoes.length} questões. Faltam ${faltam} questões. Deseja realmente enviar assim mesmo?`;
    } else {
      mensagem = `Você respondeu todas as ${PROVA_DATA.questoes.length} questões. Deseja enviar a prova? Após o envio, não será possível alterar as respostas.`;
    }

    document.getElementById("modal-mensagem").textContent = mensagem;
    document.getElementById("modal-overlay").classList.remove("oculto");

    // Configurar botões do modal
    document.getElementById("btn-modal-cancelar").onclick = Modal.fechar;
    document.getElementById("btn-modal-confirmar").onclick = Modal.confirmar;
  },

  fechar: () => {
    document.getElementById("modal-overlay").classList.add("oculto");
    tocarSom(300, 50);
  },

  confirmar: () => {
    Modal.fechar();
    Estado.provaSubmetida = true;
    Storage.salvar();

    // Tocar som de sucesso
    tocarSom(800, 200);

    // Calcular resultado e ir para tela de resultado
    setTimeout(() => {
      TelaResultado.calcular();
      Navegacao.irPara("resultado");
      TelaResultado.renderizar();
    }, 300);
  },
};

// ===== TELA 3: RESULTADO =====
const TelaResultado = {
  resultado: null,

  calcular: () => {
    let acertos = 0;
    const detalhes = [];

    PROVA_DATA.questoes.forEach((questao) => {
      const respostaAluno = Estado.respostas[questao.id] || "";
      const correto = respostaAluno === questao.gabarito;

      if (correto) acertos++;

      detalhes.push({
        numero: questao.id,
        enunciado: questao.enunciado,
        respostaAluno: respostaAluno,
        gabarito: questao.gabarito,
        correto: correto,
      });
    });

    const nota = acertos;
    const porcentagem = (acertos / PROVA_DATA.questoes.length) * 100;
    const erros = PROVA_DATA.questoes.length - acertos;

    TelaResultado.resultado = {
      nota,
      porcentagem,
      acertos,
      erros,
      detalhes,
    };
  },

  renderizar: () => {
    const { nota, porcentagem, acertos, erros, detalhes } =
      TelaResultado.resultado;

    // Determinar emoji e título baseado na nota
    let icone = "";
    let titulo = "";
    let mensagem = "";

    if (porcentagem >= 90) {
      icone = "🏆";
      titulo = "Excelente!";
      mensagem = "Parabéns! Você teve um desempenho excepcional na prova!";
    } else if (porcentagem >= 70) {
      icone = "🌟";
      titulo = "Muito Bom!";
      mensagem =
        "Ótimo trabalho! Você demonstrou bom conhecimento do conteúdo.";
    } else if (porcentagem >= 50) {
      icone = "👍";
      titulo = "Bom!";
      mensagem = "Bom resultado! Continue estudando para melhorar ainda mais.";
    } else {
      icone = "📚";
      titulo = "Continue Estudando!";
      mensagem = "Não desanime! Revise o conteúdo e tente novamente.";
    }

    // Preencher dados
    document.getElementById("icone-resultado").textContent = icone;
    document.getElementById("titulo-resultado").textContent = titulo;
    document.getElementById("nota-final").textContent = nota;
    document.getElementById(
      "nota-porcentagem"
    ).textContent = `${porcentagem.toFixed(0)}%`;
    document.getElementById("total-acertos").textContent = acertos;
    document.getElementById("total-erros").textContent = erros;
    document.getElementById("mensagem-final").textContent = mensagem;

    // Renderizar detalhes
    const detalhesContainer = document.getElementById("detalhes-questoes");
    detalhesContainer.innerHTML = detalhes
      .map(
        (d) => `
            <div class="detalhe-questao ${d.correto ? "correta" : "errada"}">
                <div class="detalhe-header">
                    <span class="detalhe-numero">Questão ${d.numero}</span>
                    <span class="detalhe-status">${
                      d.correto ? "✓ Correta" : "✗ Errada"
                    }</span>
                </div>
                <div class="detalhe-resposta">
                    Sua resposta: <strong>${
                      d.respostaAluno || "Não respondida"
                    }</strong> | 
                    Gabarito: <strong>${d.gabarito}</strong>
                </div>
            </div>
        `
      )
      .join("");

    // Configurar toggle de detalhes
    const btnDetalhes = document.getElementById("btn-ver-detalhes");
    const toggleIcon = btnDetalhes.querySelector(".toggle-icon");

    btnDetalhes.addEventListener("click", () => {
      detalhesContainer.classList.toggle("oculto");
      detalhesContainer.classList.toggle("aberto");
      toggleIcon.classList.toggle("aberto");
      tocarSom(400, 50);
    });

    // Enviar resultado por email automaticamente
    TelaResultado.enviarEmail();
  },

  enviarEmail: async () => {
    const emailLoading = document.getElementById("email-loading");
    const emailSucesso = document.getElementById("email-sucesso");
    const emailErro = document.getElementById("email-erro");

    // Mostrar loading
    emailLoading.classList.remove("oculto");
    emailSucesso.classList.add("oculto");
    emailErro.classList.add("oculto");

    const dados = {
      nomeAluno: Estado.nomeAluno,
      ...TelaResultado.resultado,
    };

    const resultado = await EmailService.enviar(dados);

    // Esconder loading
    emailLoading.classList.add("oculto");

    if (resultado.success) {
      emailSucesso.classList.remove("oculto");
      tocarSom(800, 200);
    } else {
      emailErro.classList.remove("oculto");
      tocarSom(300, 200);
    }
  },
};

// ===== UTILITÁRIOS =====
function tocarSom(frequencia, duracao) {
  try {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = "sine";
    oscillator.frequency.value = frequencia;

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + duracao / 1000
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duracao / 1000);
  } catch (e) {
    console.log("Web Audio API não disponível");
  }
}

// ===== GERENCIAMENTO DE ORIENTAÇÃO =====
window.addEventListener("orientationchange", () => {
  // Salvar estado atual ao girar a tela
  Storage.salvar();
});

// Salvar periodicamente (a cada 5 segundos se houver mudanças)
let ultimoSalvamento = JSON.stringify(Estado);
setInterval(() => {
  const estadoAtual = JSON.stringify(Estado);
  if (estadoAtual !== ultimoSalvamento) {
    Storage.salvar();
    ultimoSalvamento = estadoAtual;
  }
}, 5000);

// ===== INICIALIZAÇÃO =====
document.addEventListener("DOMContentLoaded", () => {
  // Tentar carregar estado salvo
  const carregou = Storage.carregar();

  if (carregou && Estado.provaSubmetida) {
    // Se prova já foi submetida, ir direto para resultado
    TelaResultado.calcular();
    Navegacao.irPara("resultado");
    TelaResultado.renderizar();
  } else if (carregou && Estado.telaAtual === "questoes") {
    // Se estava nas questões, continuar de onde parou
    Navegacao.irPara("questoes");
    TelaQuestoes.renderizar();
  } else {
    // Caso contrário, começar do início
    Navegacao.irPara("nome");
    TelaIdentificacao.init();
  }

  console.log(
    "%c📝 Prova - Lição 5 inicializada!",
    "color: #6366F1; font-weight: bold; font-size: 14px;"
  );
});

// Prevenir perda de dados ao fechar a página
window.addEventListener("beforeunload", (e) => {
  if (!Estado.provaSubmetida && Object.keys(Estado.respostas).length > 0) {
    e.preventDefault();
    e.returnValue =
      "Você tem respostas não submetidas. Tem certeza que deseja sair?";
    Storage.salvar();
  }
});
