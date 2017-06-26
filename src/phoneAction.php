<?php
require_once "SendMailSmtpClass.php"; // подключаем класс
 			   
$from = $_POST["email"];
   
$thema = "Заявка на звонок";
  //$html = "<pre>".$orderinfo['desc']."</pre>";
  
  
$html = '<html><table border="3" bordercolor="#ec4848"  width="100%" style="border-collapse:collapse;"><tr>
	<td style="padding: 10px; font-size: 24px">Номер телефона для звонка: </td>
	<td style="padding: 10px; font-size: 24px">'.$_POST["feedback-phone"]."</td></tr></table></html>";
$mail_to = "toca2006@yandex.ru";
   //$mail_to =  $_POST['email'];
  //mr.maxego@gmail.com
   
   
  // Вспомогательная функция для отправки почтового сообщения с вложением (Trianon)
       
$name = "image/logo.png"; // в этой переменной надо сформировать имя файла (без всякого пути)  
$EOL = "\r\n"; // ограничитель строк, некоторые почтовые сервера требуют \n - подобрать опытным путём
$boundary     = "--".md5(uniqid(time()));  // любая строка, которой не будет ниже в потоке данных.  
if ($path) {  
    $fp = fopen($path,"rb");   
    if (!$fp){
         print "Cannot open file";   
        exit();   
    }    
    $file = fread($fp, filesize($path));   
    fclose($fp);   
}  

   
if(isset($_FILES) && $_FILES['file']['error'] == 0){ // Проверяем, загрузил ли пользователь файл

    $orders =  $_FILES["file"]["type"];
 
    list($title, $desc) = explode("/", $orders);
      
    $length = 8;
    $characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for ($p = 0; $p < $length; $p++) {
        $strrandom .= $characters[mt_rand(0, strlen($characters)-1)];
    }

    
    $destiation_dir = dirname(__FILE__) ."/upload/".$strrandom.".".$desc; // Директория для размещения файла
    echo $destiation_dir;
    if(substr($_FILES["file"]["type"], 0, 6)=="image/") {
        move_uploaded_file($_FILES['file']['tmp_name'], $destiation_dir ); // Перемещаем файл в желаемую директорию
        echo 'File Uploaded'; // Оповещаем пользователя об успешной загрузке файла
    } else {
        echo "No type";
    }
} else{
    echo 'No File Uploaded'; // Оповещаем пользователя о том, что файл не был загружен
}
        
$headers    = "MIME-Version: 1.0;$EOL";   
	
$headers  = "Content-type: multipart/mixed; boundary=\"$boundary\"  \r\n"; 
$headers .= "To: $mail_to <$mail_to>\r\n";
$headers .= "From: Заявка <$from>\r\n"; 
 
 


$multipart  = "--$boundary$EOL";   
$multipart .= "Content-Type: text/html; charset=\"utf-8\"$EOL";   
$multipart .= "Content-Transfer-Encoding: base64$EOL";
$multipart .= $EOL; // раздел между заголовками и телом html-части 
$multipart .= chunk_split(base64_encode($html));       
$multipart .= chunk_split(base64_encode($file));
$multipart .= "$EOL--$boundary--$EOL";   
    
	  
	  	  // пример использования
  
// $mailSMTP = new SendMailSmtpClass('lady.hm-promo@yandex.ru', '123456qwerty', 'smtp.yandex.ru', 'Evgeniy'); // создаем экземпляр класса
 
$mailSMTP = new SendMailSmtpClass('webamazing.studio@ya.ru', 'studio5335293', 'ssl://smtp.yandex.ru', 'Aleksey', 465);


// $mailSMTP = new SendMailSmtpClass('логин', 'пароль', 'хост', 'имя отправителя');
 
 
$result =  $mailSMTP->send($mail_to, $thema, $multipart, $headers); // отправляем письмо
// $result =  $mailSMTP->send('Кому письмо', 'Тема письма', 'Текст письма', 'Заголовки письма');?>