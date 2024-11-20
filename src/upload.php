<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', 'test.insphile.in/error.log'); // Replace with the actual path to your error log file

// Set the default timezone to IST
date_default_timezone_set('Asia/Kolkata');

// Include PHPMailer files
require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phone']);
    $message = htmlspecialchars($_POST['message']);
    $attachmentPresent = isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK;

    if ($attachmentPresent) {
        $uploadDir = 'uploads/';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        $fileTmpPath = $_FILES['file']['tmp_name'];
        $fileName = $name . '_' . time() . '_' . basename($_FILES['file']['name']);
        $destPath = $uploadDir . $fileName;

        if (!move_uploaded_file($fileTmpPath, $destPath)) {
            error_log('There was an error moving the uploaded file.');
            echo 'There was an error moving the uploaded file.';
            exit;
        }
    }

    // File uploaded successfully, now send an email
    $mail = new PHPMailer(true);
    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host = 'localhost'; // Use localhost as the SMTP server
        $mail->SMTPAuth = false; // No SMTP authentication
        $mail->Port = 25; // Use port 25

        // Enable verbose debug output
        $mail->SMTPDebug = 2;
        $mail->Debugoutput = 'error_log';

        // Recipients
        $mail->setFrom('hrd@insphile.in', 'From Inspile HRD');
        $mail->addAddress('sasitharani@gmail.com', 'Sasitharani'); // Add a recipient
        $mail->addAddress('hrd@insphile.in', 'HR Department'); // Add another recipient

        // Attachments
        if ($attachmentPresent) {
            $mail->addAttachment($destPath); // Add the uploaded file as an attachment
        }

        // Content
        $mail->isHTML(true);
        $mail->Subject = 'New Enquiry Received';
        $mail->Body = '<table border="1" cellpadding="5" cellspacing="0">
                        <tr><th>Name of the enquirer</th><td>' . $name . '</td></tr>
                        <tr><th>Email of the enquirer</th><td>' . $email . '</td></tr>
                        <tr><th>Phone no</th><td>' . $phone . '</td></tr>
                        <tr><th>Message</th><td>' . $message . '</td></tr>
                        <tr><th>Is attachment there</th><td>' . ($attachmentPresent ? 'Yes' : 'No') . '</td></tr>
                      </table>';

        $mail->send();
        echo 'File uploaded and email sent successfully.';
    } catch (Exception $e) {
        error_log("Mailer Error: {$mail->ErrorInfo}");
        echo "File uploaded but email could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
} else {
    error_log('Invalid request method.');
    echo 'Invalid request method.';
}
?>