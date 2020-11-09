<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exeption;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('de','PHPMailer/language/');
$mail->IsHTML(true);

$mail->setFrom('info@blackbird-chauffeurservice.de', 'BlackBird Chauffeur Service' );
$mail->addAddress('goodwaterflow@gmail.com');

// $mail->addAddress($_POST['email']);
$mail->Subject = 'Order confirmation. Your order is OK!';

$body.='<div>Result:'.$_POST['email'].'</div>';

// if(trim(!empty($_POST['email']))){
//     $body.='<p>From:'.$_POST['email'].'</p>';
// }
// if(trim(!empty($_POST['phone']))){
//     $body.='<p>From:'.$_POST['phone'].'</p>';
// }

$mail->Body = $body;
if(!$mail->send()) {
    $message = 'Error';
} else {
    $message = 'Ok!';
}

$response = ['message' => $message];
// header('Content-type: aplication/json');
echo json_encode($response);

?>