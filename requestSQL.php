<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $receivedData = json_decode(file_get_contents("php://input"), true);

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "farmageddon";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $receivedDataStr = json_encode($receivedData);
    error_log("recievedData: " . $receivedDataStr);


    // Assuming the receivedData contains the SQL query as a string
    $query = $receivedData["letter"];
    $result = $conn->query($query);
    $response = [];
    if ($result !== false && $result !== true && $result->num_rows > 0) {
        // Fetch the data and store it in the response array
        while ($row = $result->fetch_assoc()) {
            $response[] = $row;
        }
    }


    
    $conn->close();

    $responseString = json_encode($response);
    error_log("Response: " . $responseString);
    
    // Return the data as JSON response
    header("Content-Type: application/json");

    echo json_encode($response);
}
?>
