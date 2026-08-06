// Vertex Digital - Main JavaScript Logic

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initSimulator();
  initContactForm();
  updateYear();
  initAIChat();
  initROICalculator();
});

// ==========================================
// 1. INTERACTIVE DEMO TABS
// ==========================================
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetElement = document.getElementById(targetTab);
      if (targetElement) {
        targetElement.classList.add('active');
      }
    });
  });
}

// ==========================================
// 2. SIMULATOR LOGIC
// ==========================================
function initSimulator() {
  const form = document.getElementById('simulatorForm');
  const selectedCountEl = document.getElementById('selectedCount');
  if (!form) return;

  const checkboxes = form.querySelectorAll('input[name="solucoes"]');

  function updateCount() {
    const checked = form.querySelectorAll('input[name="solucoes"]:checked');
    if (selectedCountEl) {
      selectedCountEl.textContent = checked.length;
    }
  }

  checkboxes.forEach(cb => {
    cb.addEventListener('change', updateCount);
  });

  updateCount();

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const segmento = form.querySelector('input[name="segmento"]:checked')?.value || 'Não informado';
    const prazo = form.querySelector('input[name="prazo"]:checked')?.value || 'Não informado';
    
    const checkedSolucoes = Array.from(form.querySelectorAll('input[name="solucoes"]:checked'))
      .map(cb => '• ' + cb.value);

    if (checkedSolucoes.length === 0) {
      alert('Por favor, selecione ao menos 1 solução no simulador.');
      return;
    }

    const message = `🚀 *SIMULAÇÃO DE PROJETO - VERTEX DIGITAL*\n\n` +
      `*Segmento da Empresa:* ${segmento}\n` +
      `*Soluções Selecionadas:*\n${checkedSolucoes.join('\n')}\n\n` +
      `*Prioridade de Início:* ${prazo}\n\n` +
      `Gostaria de receber uma proposta/atendimento personalizado!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5516992805627?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  });
}

// ==========================================
// 3. CONTACT LEAD MODAL
// ==========================================
function initContactForm() {
  const modal = document.getElementById('contactModal');
  const form = document.getElementById('contactForm');
  
  window.openContactModal = (solucao = 'Geral') => {
    const modalSolucaoInput = document.getElementById('modalSolucao');
    const modalTitle = document.getElementById('modalTitle');
    
    if (modalSolucaoInput) modalSolucaoInput.value = solucao;
    if (modalTitle) modalTitle.textContent = `Interesse: ${solucao}`;
    
    if (modal) modal.classList.add('active');
  };

  window.closeContactModal = () => {
    if (modal) modal.classList.remove('active');
  };

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        window.closeContactModal();
      }
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nome = document.getElementById('modalNome')?.value || '';
      const empresa = document.getElementById('modalEmpresa')?.value || '';
      const telefone = document.getElementById('modalTelefone')?.value || '';
      const solucao = document.getElementById('modalSolucao')?.value || 'Geral';

      const message = `👋 *SOLICITAÇÃO DE ATENDIMENTO - VERTEX DIGITAL*\n\n` +
        `*Nome:* ${nome}\n` +
        `*Empresa:* ${empresa}\n` +
        `*WhatsApp:* ${telefone}\n` +
        `*Interesse Principal:* ${solucao}\n\n` +
        `Gostaria de agendar um diagnóstico comercial com a equipe Vertex!`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/5516992805627?text=${encodedMessage}`;
      
      window.closeContactModal();
      window.open(whatsappUrl, '_blank');
    });
  }
}

// ==========================================
// 4. BANCO DE DADOS DA IA DE ATENDIMENTO (FAQ)
// ==========================================
const AI_KNOWLEDGE_BASE = [
  {
    id: 1,
    question: "Como funciona o Agente de IA no WhatsApp?",
    keywords: ["ia", "whatsapp", "bot", "agente", "robo", "atendimento", "automacao"],
    answer: "Nosso Agente de IA é treinado especificamente com os dados e regras da sua empresa. Ele atende 24h/dia no WhatsApp, responde dúvidas de clientes com tom humano, qualifica os leads e pode agendar reuniões direto no seu CRM!"
  },
  {
    id: 2,
    question: "Vocês configuram o CRM do zero para minha equipe?",
    keywords: ["crm", "funil", "vendas", "lead", "pipeline", "vendedores", "equipe"],
    answer: "Sim! Entregamos o CRM 100% configurado com as etapas do seu funil comercial, automações de acompanhamento (follow-up) e dashboards em tempo real para monitorar seus vendedores."
  },
  {
    id: 3,
    question: "Quanto tempo demora para criar um sistema sob medida?",
    keywords: ["tempo", "prazo", "sistema", "desenvolvimento", "demora", "plataforma", "dashboard"],
    answer: "O prazo varia conforme a complexidade. Sistemas e portais enxutos levam entre 2 a 4 semanas. Na reunião de diagnóstico, definimos o escopo exato e um cronograma garantido em contrato."
  },
  {
    id: 4,
    question: "O site é otimizado para quem vem do Instagram?",
    keywords: ["site", "landing page", "instagram", "celular", "mobile", "conversao", "velocidade"],
    answer: "Com certeza! Todos os nossos sites são desenhados Mobile-First (foco em celulares), com carregamento instantâneo (menos de 2s) e cópia persuasiva para transformar seguidores do Instagram em clientes no seu WhatsApp."
  },
  {
    id: 5,
    question: "Como funciona a Consultoria Comercial?",
    keywords: ["consultoria", "diagnostico", "processo", "script", "comercial", "treinamento", "vender"],
    answer: "Analisamos todos os gargalos da sua operação de vendas. Entregamos um Playbook Comercial exclusivo, roteiros de abordagem, scripts de contorno de objeções e treinamos seu time para aumentar a conversão."
  },
  {
    id: 6,
    question: "Qual o valor de um projeto na Vertex Digital?",
    keywords: ["preco", "valor", "quanto custa", "investimento", "pagamento", "orcamento", "custo"],
    answer: "Desenvolvemos soluções para cada momento da sua empresa. Temos projetos de sites e automações acessíveis até ecossistemas completos de CRM e Sistemas sob medida. Fale com um consultor para um orçamento exato!"
  }
];

// ==========================================
// 5. LÓGICA DO CHAT DE IA FLUTUANTE
// ==========================================
function initAIChat() {
  const drawer = document.getElementById('aiChatDrawer');
  const chipsContainer = document.getElementById('faqChips');
  const form = document.getElementById('aiChatForm');
  const input = document.getElementById('aiInput');

  window.toggleAIChat = () => {
    if (drawer) {
      drawer.classList.toggle('active');
    }
  };

  // Render FAQ Chips
  if (chipsContainer) {
    chipsContainer.innerHTML = '';
    AI_KNOWLEDGE_BASE.forEach(item => {
      const chip = document.createElement('button');
      chip.className = 'faq-chip';
      chip.innerHTML = `<span>${item.question}</span> <i class="ri-arrow-right-s-line"></i>`;
      chip.onclick = () => processUserQuery(item.question, item.answer);
      chipsContainer.appendChild(chip);
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const queryText = input.value.trim();
      if (!queryText) return;

      input.value = '';

      // Match in Knowledge base
      const matched = findBestAnswer(queryText);
      processUserQuery(queryText, matched);
    });
  }
}

function findBestAnswer(query) {
  const cleanQuery = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  for (const item of AI_KNOWLEDGE_BASE) {
    for (const key of item.keywords) {
      if (cleanQuery.includes(key)) {
        return item.answer;
      }
    }
  }

  return "Excelente pergunta! Para detalhes específicos sobre o seu caso, o ideal é conversar diretamente com nosso consultor no WhatsApp. Deseja iniciar a conversa agora?";
}

function processUserQuery(questionText, answerText) {
  const messagesContainer = document.getElementById('aiChatMessages');
  if (!messagesContainer) return;

  // Add User Bubble
  const userBubble = document.createElement('div');
  userBubble.className = 'chat-bubble user';
  userBubble.innerHTML = `<p>${escapeHTML(questionText)}</p><span class="time">${getCurrentTime()}</span>`;
  messagesContainer.appendChild(userBubble);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  // Add Typing Indicator for AI
  const typingBubble = document.createElement('div');
  typingBubble.className = 'chat-bubble ia';
  typingBubble.innerHTML = `<div class="ia-badge"><i class="ri-robot-2-line"></i> Vertex IA digitando...</div><p>...</p>`;
  messagesContainer.appendChild(typingBubble);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  // Simulate AI Response Delay
  setTimeout(() => {
    typingBubble.remove();

    const encodedMsg = encodeURIComponent(`Ol%C3%A1! Estava tirando d%C3%BAvidas na IA do site sobre "${questionText}" e gostaria de falar com um consultor.`);
    const waUrl = `https://wa.me/5516992805627?text=${encodedMsg}`;

    const aiBubble = document.createElement('div');
    aiBubble.className = 'chat-bubble ia';
    aiBubble.innerHTML = `
      <div class="ia-badge"><i class="ri-robot-2-line"></i> Assistente Vertex IA</div>
      <p>${answerText}</p>
      <a href="${waUrl}" target="_blank" class="chat-cta-btn">
        <i class="ri-whatsapp-line"></i> Falar sobre isso no WhatsApp
      </a>
      <span class="time">${getCurrentTime()}</span>
    `;
    messagesContainer.appendChild(aiBubble);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }, 750);
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag));
}

function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// ==========================================
// 6. CALCULADORA DE EFICIÊNCIA (ROI & HORAS)
// ==========================================
function initROICalculator() {
  const slider = document.getElementById('leadSlider');
  const countDisplay = document.getElementById('leadCountDisplay');
  const hoursVal = document.getElementById('hoursSavedVal');
  const boostVal = document.getElementById('revenueBoostVal');

  if (!slider) return;

  function updateCalc() {
    const leads = parseInt(slider.value, 10);
    if (countDisplay) countDisplay.textContent = `${leads} leads/dia`;
    
    // Calculation formulas
    const hoursSaved = Math.round(leads * 1.3);
    const boostPercentage = Math.min(65, Math.round(leads * 0.2 + 20));

    if (hoursVal) hoursVal.textContent = `${hoursSaved} horas`;
    if (boostVal) boostVal.textContent = `+ ${boostPercentage}%`;
  }

  slider.addEventListener('input', updateCalc);
  updateCalc();
}

// Update Footer Year
function updateYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
