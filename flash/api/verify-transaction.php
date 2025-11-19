<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

define('TRONSCAN_API_KEY', 'YOUR_TRONSCAN_API_KEY');
define('ETHERSCAN_API_KEY', 'YOUR_ETHERSCAN_API_KEY');
define('BSCSCAN_API_KEY', 'YOUR_BSCSCAN_API_KEY');

define('TRC20_ADDRESS', 'TADdaBsstFr3NVfFqc2T3XmgqXLk8ktBke');
define('ERC20_ADDRESS', '0x5e3f264c4fb120ae95ce0629c6b7e9dc6db204f0');
define('BEP20_ADDRESS', '0x5e3f264c4fb120ae95ce0629c6b7e9dc6db204f0');

$data = json_decode(file_get_contents('php://input'), true);
$txHash = $data['txHash'] ?? '';
$network = $data['network'] ?? '';
$expectedAmount = floatval($data['amount'] ?? 0);

if (empty($txHash) || empty($network)) {
    echo json_encode(['success' => false, 'message' => 'Missing parameters']);
    exit;
}

function verifyTRC20($txHash, $expectedAmount) {
    $url = "https://apilist.tronscanapi.com/api/transaction-info?hash=" . $txHash;
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['TRON-PRO-API-KEY: ' . TRONSCAN_API_KEY]);
    $response = curl_exec($ch);
    curl_close($ch);
    
    $data = json_decode($response, true);
    
    if (!$data || !isset($data['contractRet'])) {
        return ['success' => false, 'message' => 'Transaction not found'];
    }
    
    if ($data['contractRet'] !== 'SUCCESS') {
        return ['success' => false, 'message' => 'Transaction failed'];
    }
    
    $toAddress = $data['toAddress'] ?? '';
    $amount = floatval($data['trigger_info']['parameter']['_value'] ?? 0) / 1000000;
    
    if (strtolower($toAddress) !== strtolower(TRC20_ADDRESS)) {
        return ['success' => false, 'message' => 'Wrong receiver address'];
    }
    
    if (abs($amount - $expectedAmount) > 0.01) {
        return ['success' => false, 'message' => 'Amount mismatch'];
    }
    
    return ['success' => true, 'amount' => $amount, 'message' => 'Verified'];
}

function verifyERC20($txHash, $expectedAmount) {
    $url = "https://api.etherscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash=" . $txHash . "&apikey=" . ETHERSCAN_API_KEY;
    
    $response = file_get_contents($url);
    $data = json_decode($response, true);
    
    if (!$data || !isset($data['result'])) {
        return ['success' => false, 'message' => 'Transaction not found'];
    }
    
    $tx = $data['result'];
    $toAddress = $tx['to'] ?? '';
    
    if (strtolower($toAddress) !== strtolower(ERC20_ADDRESS)) {
        return ['success' => false, 'message' => 'Wrong receiver address'];
    }
    
    $receiptUrl = "https://api.etherscan.io/api?module=proxy&action=eth_getTransactionReceipt&txhash=" . $txHash . "&apikey=" . ETHERSCAN_API_KEY;
    $receiptResponse = file_get_contents($receiptUrl);
    $receiptData = json_decode($receiptResponse, true);
    
    if ($receiptData['result']['status'] !== '0x1') {
        return ['success' => false, 'message' => 'Transaction failed'];
    }
    
    return ['success' => true, 'message' => 'Verified'];
}

function verifyBEP20($txHash, $expectedAmount) {
    $url = "https://api.bscscan.com/api?module=proxy&action=eth_getTransactionByHash&txhash=" . $txHash . "&apikey=" . BSCSCAN_API_KEY;
    
    $response = file_get_contents($url);
    $data = json_decode($response, true);
    
    if (!$data || !isset($data['result'])) {
        return ['success' => false, 'message' => 'Transaction not found'];
    }
    
    $tx = $data['result'];
    $toAddress = $tx['to'] ?? '';
    
    if (strtolower($toAddress) !== strtolower(BEP20_ADDRESS)) {
        return ['success' => false, 'message' => 'Wrong receiver address'];
    }
    
    $receiptUrl = "https://api.bscscan.com/api?module=proxy&action=eth_getTransactionReceipt&txhash=" . $txHash . "&apikey=" . BSCSCAN_API_KEY;
    $receiptResponse = file_get_contents($receiptUrl);
    $receiptData = json_decode($receiptResponse, true);
    
    if ($receiptData['result']['status'] !== '0x1') {
        return ['success' => false, 'message' => 'Transaction failed'];
    }
    
    return ['success' => true, 'message' => 'Verified'];
}

$result = ['success' => false, 'message' => 'Invalid network'];

switch ($network) {
    case 'TRC20':
        $result = verifyTRC20($txHash, $expectedAmount);
        break;
    case 'ERC20':
        $result = verifyERC20($txHash, $expectedAmount);
        break;
    case 'BEP20':
        $result = verifyBEP20($txHash, $expectedAmount);
        break;
}

echo json_encode($result);
