# Set up your Node RED connector

Set up your Node RED server and App as it is described [here](/Node-RED-quick-start.md).  
You can find example app configuration files (in JSON format) in this folder.  
There are 2 integration options and both have 2 flows: an uplink flow and a downlink flow.

1. Integration with a REST API  
   The example flow of this option is in the [ttn-rest-nodere.json](./ttn-rest-nodered.json) file.  
   In order to allow Node-RED to send (forward) downlink messages to TTN NS, you need to use an access key that can be set by editing the code (msg.key) of "TTN DL Interface" node in the Node-RED GUI.
2. Integration with MQTT  
    The example flow of this option is in the [ttn-mqtt-nodere.json](./ttn-mqtt-nodered.json) file.  
    Please note that MQTT requires a messages broker too: - TTN NS publishes messages to a topic of the Message Broker - The Node-RED demo server will subscribe to that messages and forward them to ThingPark X Location Engine
   In the MQTT example flows we assumed that the message broker is installed on the same machine as the Node-RED server. You can update the MQTT parameters (url, credentials etc.) by editing the pink [mqtt subscribe] and [mqtt publish] nodes through the Node-RED GUI.

# Route your device messages from TTN to your Node-RED application

1. Login to TTN console here:  
   [https://console.thethingsnetwork.org/](https://console.thethingsnetwork.org/)
2. From the main console mage select "**APPLICATIONS**" and click on the green "**+ add application**" button to create a new application
3. Fill in the form and click on the "**Add application**" button on the bottom of the page.  
   Example values may be as follows:
   - Application ID: **_nodered-tpxle-connector_**
   - Description: **_Node RED connector App for TPX Location Engine_**
   - Application EUI: **_EUI is issued by The Things Network_**
   - Handler registration: **_ttn-handler-eu_**
4. After you have created (added) your new application, you need to configure it in 2 steps:
   - Manage your Application EUIs
   - Register your Devices
5. Click on "**manage euis**" in the "**APPLICATION EUIS** section andd add a new App EUI that is the App EUI of your device.  
   _Don't accept any value suggested to be generated automatically. Set your own value._  
    An example App EUI value is the following:
   - Add EUI: **_20 63 5f 00 01 00 00 13_**
6. Register devices by clicking on "**register device**" in the "**DEVICES**" section  
   _Don't accept any values suggested to be generated automatically. Set your own values._  
   Example values may be as follows:
   - Device ID: **_abeeway-smart-badge-01_**
   - Description: **_Abeeway Smart Badge 01_**
   - Device EUI: **_20 63 5F 01 00 00 00 01_**
   - App Key: **_00 11 22 33 44 55 66 77 88 99 AA BB CC DD EE FF_**
   - App EUI: **_20 63 5f 00 01 00 00 13_** _(select the one you have just added)_
7. Record (copy it to the clipboard) the **default key** under the **ACCESS KEYS** section. You will need it when you set up your Node-RED connector.
