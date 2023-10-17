<?php
session_start();
include('connection.php');
// SQL query to retrieve 'name' and 'tel' from 'members' table
$sql = "SELECT name, tel FROM members";
$result = $conn->query($sql);

// Check if there are results
if ($result->num_rows > 0) {
    $data = array();
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    echo json_encode($data);
} else {
    echo json_encode(array());
}

// Close the database connection
$conn->close();