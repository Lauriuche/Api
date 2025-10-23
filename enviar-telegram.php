<?php
require 'config.php';
$msg = $_GET['msg'] ?? 'Teste de envio';
file_get_contents("https://api.telegram.org/bot".BOT_TOKEN."/sendMessage?chat_id=".CHAT_ID."&text=".urlencode($msg));
echo "Enviado!";
?>