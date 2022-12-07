<?php 

define ( 'DATA_FILE' , "data_sensor.json" );

$json_data_received = file_get_contents("php://input");

file_put_contents(DATA_FILE, $json_data_received);
echo "Data saved to ./".DATA_FILE;

?>
