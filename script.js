// Inicializa o documento
document.addEventListener('DOMContentLoaded', function() {
    // Configura data de validade padrão (7 dias a partir de hoje)
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    document.getElementById('valid-until').valueAsDate = nextWeek;
    
    // Gera hash aleatório para assinatura digital
    const randomHash = Math.floor(1000000 + Math.random() * 9000000);
    document.getElementById('signature-hash').textContent = randomHash;
    
    // Adiciona primeira linha de item
    addItemRow();
    
    // Atualiza a data atual
    updateCurrentDate();
});

// Atualiza a data atual
function updateCurrentDate() {
    const now = new Date();
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    document.getElementById('current-date').textContent = now.toLocaleDateString('pt-BR', options);
    document.getElementById('signature-date').textContent = now.toLocaleDateString('pt-BR', options);
}

// Adiciona nova linha de item
document.getElementById('add-item').addEventListener('click', addItemRow);

function addItemRow() {
    const tbody = document.getElementById('items-body');
    const newRow = document.createElement('tr');
    const rowId = Date.now(); // ID único para a linha
    
    newRow.innerHTML = `
        <td><input type="text" class="item-name" placeholder="Nome do item"></td>
        <td><textarea class="item-desc" placeholder="Descrição detalhada"></textarea></td>
        <td><input type="number" class="item-qty" min="1" value="1"></td>
        <td><input type="number" class="item-price" min="0" step="0.01" placeholder="0,00"></td>
        <td class="item-total">R$ 0,00</td>
        <td><button class="remove-btn" data-row="${rowId}">X</button></td>
    `;
    
    tbody.appendChild(newRow);
    
    // Adiciona eventos para calcular totais
    const inputs = newRow.querySelectorAll('.item-qty, .item-price');
    inputs.forEach(input => {
        input.addEventListener('input', calculateTotals);
    });
    
    // Adiciona evento para remover linha
    newRow.querySelector('.remove-btn').addEventListener('click', function() {
        this.closest('tr').remove();
        calculateTotals();
        updatePageCount();
    });
    
    calculateTotals();
    updatePageCount();
}

// Calcula totais
function calculateTotals() {
    let grandTotal = 0;
    const rows = document.querySelectorAll('#items-body tr');
    
    rows.forEach(row => {
        const qty = parseFloat(row.querySelector('.item-qty').value) || 0;
        const price = parseFloat(row.querySelector('.item-price').value) || 0;
        const total = qty * price;
        
        row.querySelector('.item-total').textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
        grandTotal += total;
    });
    
    document.getElementById('grand-total').textContent = `R$ ${grandTotal.toFixed(2).replace('.', ',')}`;
}

// Atualiza contagem de páginas
function updatePageCount() {
    document.querySelector('.footer').textContent = "Página 1 de 1";
}

// Prepara a versão PDF com os dados
function preparePdfVersion() {
    const pdfTemplate = `
        <div class="pdf-content">
            <!-- Cabeçalho com informações da empresa -->
            <div class="header" style="display: flex; justify-content: space-between; margin-bottom: 10mm;">
                <div class="logo-section" style="display: flex; align-items: flex-start; gap: 5mm;">
                    <img src="https://via.placeholder.com/150x80?text=LOGO" alt="Logo" class="company-logo" style="max-width: 40mm; max-height: 20mm;">
                    <div class="company-details" style="flex: 1;">
                        <div class="company-name" style="font-size: 16pt; font-weight: bold; margin-bottom: 2mm;">${document.getElementById('company-name').textContent}</div>
                        <div class="company-data" style="font-size: 10pt; color: #555;">
                            <div>${document.getElementById('company-address').textContent}</div>
                        </div>
                    </div>
                </div>
                <div class="contact-info" style="text-align: right; font-size: 10pt;">
                    <div><strong>WhatsApp:</strong> ${document.getElementById('company-whatsapp').textContent}</div>
                    <div><strong>Data:</strong> ${document.getElementById('current-date').textContent}</div>
                </div>
            </div>
            
            <!-- Título do orçamento -->
            <div class="budget-title" style="text-align: center; font-size: 14pt; font-weight: bold; margin: 5mm 0; padding: 2mm 0; border-top: 0.5pt solid #ddd; border-bottom: 0.5pt solid #ddd;">ORÇAMENTO</div>
            
            <!-- Informações do cliente -->
            <div class="form-group" style="display: flex; flex-wrap: wrap; gap: 5mm; margin-bottom: 5mm; font-size: 10pt;">
                <div style="flex: 1; min-width: 60mm;">
                    <div style="font-weight: bold;">Cliente:</div>
                    <div style="padding: 1mm 0; border-bottom: 0.5pt solid #eee;">${document.getElementById('client-name').value || 'Não informado'}</div>
                </div>
                <div style="flex: 1; min-width: 60mm;">
                    <div style="font-weight: bold;">Telefone:</div>
                    <div style="padding: 1mm 0; border-bottom: 0.5pt solid #eee;">${document.getElementById('client-phone').value || 'Não informado'}</div>
                </div>
                <div style="flex: 1; min-width: 60mm;">
                    <div style="font-weight: bold;">Validade do orçamento:</div>
                    <div style="padding: 1mm 0; border-bottom: 0.5pt solid #eee;">${document.getElementById('valid-until').valueAsDate?.toLocaleDateString('pt-BR') || 'Não definida'}</div>
                </div>
            </div>
            
            <!-- Tabela de itens -->
            <table style="width: 100%; border-collapse: collapse; margin: 5mm 0; font-size: 10pt;">
                <thead>
                    <tr>
                        <th width="15%" style="border: 0.5pt solid #ddd; padding: 2mm; text-align: left; background-color: #f5f5f5;">Item</th>
                        <th width="35%" style="border: 0.5pt solid #ddd; padding: 2mm; text-align: left; background-color: #f5f5f5;">Descrição</th>
                        <th width="10%" style="border: 0.5pt solid #ddd; padding: 2mm; text-align: left; background-color: #f5f5f5;">Qtd</th>
                        <th width="15%" style="border: 0.5pt solid #ddd; padding: 2mm; text-align: left; background-color: #f5f5f5;">Valor Unit.</th>
                        <th width="15%" style="border: 0.5pt solid #ddd; padding: 2mm; text-align: left; background-color: #f5f5f5;">Total</th>
                    </tr>
                </thead>
                <tbody id="pdf-items-body">
                    ${generatePdfItems()}
                </tbody>
                <tfoot>
                    <tr style="font-weight: bold; background-color: #f0f0f0;">
                        <td colspan="4" style="border: 0.5pt solid #ddd; padding: 2mm;">TOTAL</td>
                        <td style="border: 0.5pt solid #ddd; padding: 2mm;">${document.getElementById('grand-total').textContent}</td>
                    </tr>
                </tfoot>
            </table>
            
            <!-- Formas de pagamento e garantia -->
            <div style="display: flex; gap: 10mm; margin: 5mm 0; font-size: 10pt;">
                <div style="flex: 1;">
                    <div style="font-weight: bold;">Forma de Pagamento:</div>
                    <div style="padding: 1mm 0; border-bottom: 0.5pt solid #eee;">${document.getElementById('payment-method').value}</div>
                </div>
                <div style="flex: 1;">
                    <div style="font-weight: bold;">Garantia (dias):</div>
                    <div style="padding: 1mm 0; border-bottom: 0.5pt solid #eee;">${document.getElementById('warranty-period').value}</div>
                </div>
            </div>
            
            <!-- Assinatura -->
            <div style="text-align: center; margin: 10mm 0 5mm; font-size: 10pt;">
                <div>Rio de Janeiro, ${document.getElementById('signature-date').textContent}</div>
                <div style="display: inline-block; border-top: 0.5pt solid #000; padding-top: 1mm; margin-bottom: 2mm; width: 50mm;">Assinado digitalmente #${document.getElementById('signature-hash').textContent}</div>
                <div>${document.getElementById('signature-company-name').textContent}</div>
            </div>
            
            <!-- Rodapé -->
            <div style="text-align: center; margin-top: 5mm; font-size: 8pt; color: #555;">Página 1 de 1</div>
        </div>
    `;
    
    document.getElementById('budget-pdf').innerHTML = pdfTemplate;
}

// Gera os itens para o PDF
function generatePdfItems() {
    let itemsHtml = '';
    const rows = document.querySelectorAll('#items-body tr');
    
    rows.forEach(row => {
        const name = row.querySelector('.item-name').value || 'Item sem nome';
        const desc = row.querySelector('.item-desc').value || '';
        const qty = row.querySelector('.item-qty').value || '0';
        const price = parseFloat(row.querySelector('.item-price').value) || 0;
        const total = parseFloat(row.querySelector('.item-total').textContent.replace('R$ ', '').replace(',', '.')) || 0;
        
        itemsHtml += `
            <tr>
                <td style="border: 0.5pt solid #ddd; padding: 2mm;">${name}</td>
                <td style="border: 0.5pt solid #ddd; padding: 2mm;">${desc}</td>
                <td style="border: 0.5pt solid #ddd; padding: 2mm;">${qty}</td>
                <td style="border: 0.5pt solid #ddd; padding: 2mm;">R$ ${price.toFixed(2).replace('.', ',')}</td>
                <td style="border: 0.5pt solid #ddd; padding: 2mm;">R$ ${total.toFixed(2).replace('.', ',')}</td>
            </tr>
        `;
    });
    
    return itemsHtml;
}

// Gera PDF profissional
document.getElementById('generate-pdf').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;
    
    // Prepara a versão PDF
    preparePdfVersion();
    
    // Cria o PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfElement = document.getElementById('budget-pdf');
    
    // Temporariamente mostra o elemento para captura
    pdfElement.style.display = 'block';
    
    html2canvas(pdfElement, {
        scale: 2,
        logging: false,
        useCORS: true,
        windowWidth: pdfElement.scrollWidth,
        windowHeight: pdfElement.scrollHeight
    }).then(canvas => {
        pdfElement.style.display = 'none';
        
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = pdf.internal.pageSize.getWidth() - 20; // Margens
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
        pdf.save(`Orçamento_${document.getElementById('client-name').value || 'SemNome'}.pdf`);
    });
});

// Compartilha via WhatsApp
document.getElementById('share-whatsapp').addEventListener('click', function() {
    // Prepara a versão PDF
    preparePdfVersion();
    
    const pdfElement = document.getElementById('budget-pdf');
    pdfElement.style.display = 'block';
    
    html2canvas(pdfElement, {
        scale: 1,
        logging: false,
        useCORS: true,
        windowWidth: pdfElement.scrollWidth,
        windowHeight: pdfElement.scrollHeight
    }).then(canvas => {
        pdfElement.style.display = 'none';
        
        const imgData = canvas.toDataURL('image/png');
        const phone = document.getElementById('client-phone').value.replace(/\D/g, '');
        
        // Cria link para download
        const link = document.createElement('a');
        link.download = `Orçamento_${document.getElementById('client-name').value || 'SemNome'}.png`;
        link.href = imgData;
        link.click();
        
        // Mensagem para WhatsApp
        const message = encodeURIComponent(
            `Olá ${document.getElementById('client-name').value || 'Cliente'}!\n\n` +
            `Segue o orçamento solicitado:\n` +
            `*Validade:* ${document.getElementById('valid-until').valueAsDate?.toLocaleDateString('pt-BR') || 'Não definida'}\n` +
            `*Forma de Pagamento:* ${document.getElementById('payment-method').value}\n` +
            `*Valor Total:* ${document.getElementById('grand-total').textContent}\n\n` +
            `Agradecemos pela preferência!`
        );
        
        const whatsappUrl = phone ? 
            `https://wa.me/55${phone}?text=${message}` : 
            `https://wa.me/?text=${message}`;
        
        window.open(whatsappUrl, '_blank');
    });
});