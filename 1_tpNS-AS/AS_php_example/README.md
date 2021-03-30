# PHP Application Server Example

This folder presents a simple PHP example code for an Application Server that receives http push messages from 
ThingPark Wireless or ThingPark Enterprise network server and stores it in a local text file.

**api_sensor.php**

- Handles the incomming POST request and saves the received data in the 'data_sensor.json' file.

**data_sensor.json**

- A json file where this demo app is storing the latest incomming message.

**view_data_sensor.php**

- presents the content of the data_sensor.json file
