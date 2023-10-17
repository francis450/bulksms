<?php
session_start();
include('connection.php');
if(isset($_POST['name']) && isset($_POST['tel'])){
    $name = $_POST['name'];
    $tel = $_POST['tel'];
    $sql = "INSERT INTO members (`name`, `tel`) VALUES('$name','$tel')";
    $result = $conn->query($sql);

    if($result){
        echo "Success";
    }else{
        echo mysqli_error($conn);
    }
}
