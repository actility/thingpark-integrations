# Python Application Server Example

This folder presents a simple Python example code for an Application Server that receives http push messages from 
ThingPark Wireless or ThingPark Enterprise network server and stores it in a local text file.

Set up and activate a virtual environment (Linux):
```
python3 -m venv venv
source ./venv/bin/activate
```

Set up and activate a virtual environment (Windows):
```
python3 -m venv venv
.\venv\Scripts\activate
```

Install dependencies:
```
pip install -r requirements.txt
```

Run the server:
```
python3 server.py
```

Send a simulated test message:
(Do it from a different terminal while the server is running)
```
python3 test_the_server.py
```

Check if the simulated test message is written into the msg.log file properly.
(Open the file manually and look at its content)

-----------------------
Send a downlink message to ThingPark Community Platform:  
(Edit the code and set the configuration constants properly))
```
python3 send_downlink_with_token.py
```
