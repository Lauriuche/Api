<?php
require 'config.php';

$nome = $_POST['nome'] ?? 'Sem nome';
$telefone = $_POST['telefone'] ?? 'Sem telefone';

$valor = '85.00'; // valor fixo da cota

$txid = uniqid();

$payload = [
    'calendario' => ['expiracao' => 3600],
    'valor' => ['original' => $valor],
    'chave' => PIX_CHAVE,
    'solicitacaoPagador' => "Bolão da Virada 2025 - $nome",
];

$curl = curl_init();
curl_setopt_array($curl, [
    CURLOPT_URL => "https://pix.api.efi.com.br/v2/cob/$txid",
    CURLOPT_SSLCERT => CERTIFICADO_PATH,
    CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
    CURLOPT_USERPWD => EFI_CLIENT_ID . ':' . EFI_CLIENT_SECRET,
    CURLOPT_POSTFIELDS => json_encode($payload),
    CURLOPT_RETURNTRANSFER => true,
]);

$response = curl_exec($curl);
curl_close($curl);
$data = json_decode($response, true);

if (isset($data['location'])) {
    $pixUrl = "https://pix.api.efi.com.br/v2/gn/qr-code?pixUrl=" . urlencode($data['location']);
    $qrcode = file_get_contents($pixUrl);
    $base64 = base64_encode($qrcode);

    file_put_contents('registrations.json', json_encode([$txid => ['nome' => $nome, 'telefone' => $telefone]], JSON_PRETTY_PRINT));

    echo json_encode(['qrcode' => $base64, 'copiaecola' => $data['location']]);
} else {
    echo json_encode(['erro' => $data]);
}
?>