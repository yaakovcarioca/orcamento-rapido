# Orçamento Rápido 💼

Uma aplicação web simples e responsiva para gerar orçamentos profissionais rapidamente — ideal para autônomos, pequenas empresas ou freelancers que precisam de algo rápido e funcional.

---

## 🧾 Sobre o Projeto

O **Orçamento Rápido** é uma ferramenta frontend (apenas HTML, CSS e JavaScript) que permite:

- Adicionar/remover itens ao orçamento  
- Calcular totais automaticamente  
- Gerar PDF do orçamento (usando `jsPDF` e `html2canvas`)  
- Compartilhar por WhatsApp com mensagem pré-formatada  
- Assinatura digital com hash único  

É **100% offline**, não requer backend, e pode ser usado apenas abrindo o arquivo `index.html` no navegador.

---

## ⚠️ Problemas Conhecidos / O que Precisa Ser Corrigido

Se você estiver interessado em ajudar a melhorar esse projeto, aqui estão alguns dos pontos que precisam de atenção:

### 1. ✅ Geração de Hash da Assinatura
O hash aleatório (#1234567) aparece como texto fixo no código (`${...}`), e **não é gerado dinamicamente**. Precisamos garantir que ele seja atualizado sempre que a página carregar.

### 2. ❌ Botões nem sempre funcionam
Em alguns navegadores ou após certas interações, os botões "Gerar PDF" e "Enviar por WhatsApp" podem falhar. Isso pode estar relacionado ao carregamento assíncrono das bibliotecas externas.

### 3. 🖼️ Estilo do PDF inconsistente
Às vezes, o layout do PDF gerado não reflete exatamente o visual da tela. Podemos melhorar a renderização com CSS específico ou usar métodos alternativos.

### 4. 📱 Responsividade
Embora o layout já tenha algumas regras para dispositivos móveis, há espaço para melhorias na experiência mobile.

### 5. 🧪 Testes e validações
Precisamos adicionar validações mais robustas nos campos, como:
- Validação de telefone
- Formatação automática de valores
- Tratamento de erros no download do PDF/imagem

---

## 🔧 Tecnologias Utilizadas

- **HTML5** – Estrutura do documento
- **CSS3** – Estilização e responsividade
- **JavaScript (ES6+)** – Lógica do front-end
- **jsPDF** – Para geração de PDF
- **html2canvas** – Para capturar o layout como imagem

---

## 🛠 Como Usar

1. Clone o repositório:
   ```bash
   git clone https://github.com/yaakovcarioca/orcamento-rapido.git
   ```
Abra o arquivo index.html no seu navegador.

Preencha os dados do cliente e adicione itens ao orçamento.

Use os botões para:
Adicionar Item
Gerar PDF
Enviar por WhatsApp

## 🤝 Contribuições

Sinta-se à vontade para contribuir com melhorias! Basta abrir uma issue ou enviar um pull request 😊

Como contribuir:

- Faça um fork do repositório

- Crie uma nova branch: git checkout -b feature/minha-correcao

- Faça suas alterações e adicione testes, se possível

- Commit suas mudanças: git commit -m 'Corrige bug XYZ'

- Envie para a branch principal: git push origin feature/minha-correcao

- Abra um Pull Request descrevendo sua correção

## 📬 Contato
Desenvolvido por Yaakov Carioca https://github.com/yaakovcarioca

Se quiser contribuir ou tiver sugestões, fique à vontade para abrir uma issue ou entrar em contato!

