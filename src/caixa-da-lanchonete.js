class CaixaDaLanchonete {
    static cardapio = {
        cafe: { descricao: 'Café', valor: 3.00 },
        chantily: { descricao: 'Chantily (extra do Café)', valor: 1.50 },
        suco: { descricao: 'Suco Natural', valor: 6.20 },
        sanduiche: { descricao: 'Sanduíche', valor: 6.50 },
        queijo: { descricao: 'Queijo (extra do Sanduíche)', valor: 2.00 },
        salgado: { descricao: 'Salgado', valor: 7.25 },
        combo1: { descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
        combo2: { descricao: '1 Café e 1 Sanduíche', valor: 7.50 },
    };

    static extraItems = {
        queijo: 'sanduiche',
        chantily: 'cafe'
    };

    calcularValorDaCompra(formaDePagamento, itens) {
        const formasDePagamentoValidas = ['dinheiro', 'debito', 'credito'];

        if (!formasDePagamentoValidas.includes(formaDePagamento)) {
            return 'Forma de pagamento inválida!';
        }

        if (itens.length === 0) {
            return 'Não há itens no carrinho de compra!';
        }

        const selectedItems = {};
        let total = 0;
        let hasMainItem = false;

        for (const item of itens) {
            const [codigo, quantidade] = item.split(',');

            if (!CaixaDaLanchonete.cardapio[codigo]) {
                return 'Item inválido!';
            }

            selectedItems[codigo] = (selectedItems[codigo] || 0) + parseInt(quantidade);

            if (!['chantily', 'queijo'].includes(codigo)) {
                hasMainItem = true;
            }

            total += CaixaDaLanchonete.cardapio[codigo].valor * quantidade;
        }

        for (const extraItem in CaixaDaLanchonete.extraItems) {
            const principal = CaixaDaLanchonete.extraItems[extraItem];
            if (selectedItems[extraItem] && !selectedItems[principal]) {
                return 'Item extra não pode ser pedido sem o principal';
            }
        }

        if (!hasMainItem) {
            return 'Item extra não pode ser pedido sem o principal';
        }

        if (formaDePagamento === 'dinheiro') {
            total *= 0.95;

            if (total <= 0) {
                return 'Quantidade inválida!';
            }
        } else if (formaDePagamento === 'credito') {
            total *= 1.03;
        }

        return `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
}

export { CaixaDaLanchonete };