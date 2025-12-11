// server.js - Código Node.js que será hospedado em um Serviço de Nuvem

// ... (imports: express, cors, fetch) ...

const app = express();
const PORT = process.env.PORT || 3000; // Usa a porta do ambiente de hospedagem

// *** SEGURANÇA: CHAVE LIDA DE UMA VARIÁVEL DE AMBIENTE ***
// Você configurará a variável PAGOU_API_KEY no painel do Vercel/Railway.
const PAGOU_API_KEY = process.env.PAGOU_API_KEY; 
const PAGOU_API_URL = 'https://api.pagou.com.br/v1/billing/create'; 

// 🔑 Configuração CORS: Use a URL final do seu GitHub Pages aqui!
app.use(cors({
    origin: 'https://seu-usuario.github.io' 
}));

// ----------------------------------------------------
// ROTA PARA CRIAÇÃO DE COBRANÇA
// ----------------------------------------------------
app.post('/criar-cobranca-pagou', async (req, res) => {
    if (!PAGOU_API_KEY) {
        return res.status(500).json({ error: 'Chave de API do Pagou não configurada no servidor.' });
    }
    // ... (Restante da lógica de envio para o Pagou usando a chave) ...
});

app.listen(PORT, () => {
    console.log(`✅ Servidor Backend Pagou rodando na porta ${PORT}`);
});
