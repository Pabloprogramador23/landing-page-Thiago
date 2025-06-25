// Configuração do número do WhatsApp (substitua pelo seu número)
const WHATSAPP_NUMBER = '5585986303253'; // Formato: código do país + DDD + número (sem espaços, traços ou parênteses)

// Função para enviar mensagem para WhatsApp
function enviarParaWhatsApp(event) {
    event.preventDefault(); // Previne o envio normal do formulário

    // Captura os valores dos campos
    const nome = document.getElementById('nome').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    // Validação básica
    if (!nome || !telefone || !email || !mensagem) {
        alert('Por favor, preencha todos os campos antes de enviar.');
        return;
    }

    // Validação de email simples
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, insira um email válido.');
        return;
    }

    // Monta a mensagem para o WhatsApp
    const mensagemWhatsApp = `*Nova mensagem do site:*

👤 *Nome:* ${nome}
📞 *Telefone:* ${telefone}
📧 *Email:* ${email}

💬 *Mensagem:*
${mensagem}

---
_Enviado através do formulário do site_`;

    // Codifica a mensagem para URL
    const mensagemCodificada = encodeURIComponent(mensagemWhatsApp);

    // Cria o link do WhatsApp
    const linkWhatsApp = `https://wa.me/${WHATSAPP_NUMBER}?text=${mensagemCodificada}`;

    // Abre o WhatsApp em uma nova aba
    window.open(linkWhatsApp, '_blank');

    // Opcional: Limpa o formulário após o envio
    document.getElementById('whatsappForm').reset();

    // Opcional: Mostra mensagem de sucesso
    alert('Redirecionando para o WhatsApp! 📱');
}

// Adiciona o evento de submit ao formulário quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('whatsappForm');
    if (form) {
        form.addEventListener('submit', enviarParaWhatsApp);
    }
});

// Função para formatar o telefone automaticamente
function formatarTelefone(input) {
    let valor = input.value.replace(/\D/g, ''); // Remove tudo que não é dígito
    
    if (valor.length <= 10) {
        // Formato: (XX) XXXX-XXXX
        valor = valor.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else {
        // Formato: (XX) 9XXXX-XXXX
        valor = valor.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    
    input.value = valor;
}

// Adiciona formatação automática ao campo de telefone
document.addEventListener('DOMContentLoaded', function() {
    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function() {
            formatarTelefone(this);
        });
    }
});
