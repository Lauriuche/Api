<?php
require 'config.php';

$input = file_get_contents("php://input");
$data = json_decode($input, true);

if (isset($data['pix'])) {
    $txid = $data['pix'][0]['txid'];
    $regs = json_decode(file_get_contents('registrations.json'), true);
    $p = $regs[$txid] ?? ['nome' => 'Desconhecido', 'telefone' => 'N/A'];

    $msg = "✅ Pagamento confirmado!\n\nNome: {$p['nome']}\nTelefone: {$p['telefone']}\nBolão da Virada 2025 🎉";

    file_get_contents("https://api.telegram.org/bot".BOT_TOKEN."/sendMessage?chat_id=".CHAT_ID."&text=".urlencode($msg));
}
?>