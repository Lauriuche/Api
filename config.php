<?php
require 'vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

define('EFI_CLIENT_ID', $_ENV['EFI_CLIENT_ID']);
define('EFI_CLIENT_SECRET', $_ENV['EFI_CLIENT_SECRET']);
define('PIX_CHAVE', $_ENV['PIX_CHAVE']);
define('CERTIFICADO_PATH', $_ENV['CERTIFICADO_PATH']);
define('BOT_TOKEN', $_ENV['BOT_TOKEN']);
define('CHAT_ID', $_ENV['CHAT_ID']);
?>