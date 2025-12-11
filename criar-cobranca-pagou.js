// api/criar-cobranca-pagou.js - Backend (API)

const fetch = require('node-fetch');

// Lê a chave da variável de ambiente (Segurança!)
const PAGOU_API_KEY = process.env.PAGOU_API_KEY; 
const PAGOU_API_URL = 'https://api.pagou.com.br/v1/billing/create'; 

// Este é um módulo exportado para Vercel Serverless Function
module.exports = async (req, res) => {
    // 1. Configuração CORS: Permite que seu frontend no GitHub Pages acesse esta API
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (!PAGOU_API_KEY) {
        return res.status(500).json({ error: 'Chave de API do Pagou não configurada no Servidor.' });
    }

    try {
        const { amount, description, customerName } = req.body;
        
        // Dados para a API do Pagou
        const payload = {
            amount: amount,
            description: description,
            methods: ["PIX", "CARD"],
            customer: { name: customerName || 'Cliente Padrão' }
        };

        const pagouResponse = await fetch(PAGOU_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // AUTENTICAÇÃO COM CHAVE SECRETA
                'Authorization': `Bearer ${PAGOU_API_KEY}` 
            },
            body: JSON.stringify(payload)
        });

        const pagouData = await pagouResponse.json();

        if (pagouResponse.ok) {
            // Retorna o link de pagamento do Pagou para o Frontend
            res.status(200).json({ 
                success: true, 
                id: pagouData.id, 
                paymentLink: pagouData.paymentLink || 'URL_NAO_DISPONIVEL' 
            });
        } else {
            // Erro retornado pela API do Pagou
            res.status(pagouResponse.status).json({ 
                error: pagouData.message || 'Erro ao processar na API do Pagou.' 
            });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro interno ao conectar com o Pagou.' });
    }
};
