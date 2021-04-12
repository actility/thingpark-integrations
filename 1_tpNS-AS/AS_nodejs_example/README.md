# NodeJS Application Server Example

This folder presents a simple NodeJS example code for an Application Server that receives http push messages from 
ThingPark Wireless or ThingPark Enterprise network server and stores it in a local text file.

Install the dependencies:
```
npm install
```

Run the server:
```
node server.js
```

Send a simulated test message:
(Do it from a different terminal while the server is running)
```
node test_the_server.js
```

Check if the simulated test message is written into the msg.log file properly.
(Open the file manually and look at its content)

-----------------------
Send a downlink message to ThingPark Community Platform:  
(Edit the code and set the configuration constants properly))
```
node send_downlink_with_token.js
```
