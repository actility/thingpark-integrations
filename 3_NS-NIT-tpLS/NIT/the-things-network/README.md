# TTN integration quick setup guide

## Generate an access token for ThingPark Location Solver (tpLS)

1. Log in to ThingPark DX API through its `/getstarted` endpoint.  
   https://dx-api-dev1.thingpark.com/getstarted  
   (Use your ThingPark credentials.)
2. After the successful login copy the Access Token from the emerging screen.

## Set up a Network Interface Translator (NIT) server for Node-RED.

Set up your Node RED server and App as it is described [here](../../../docs/Node-RED-quick-start.md).  
You can find example app configuration files (in JSON format) in the [NIT_node-red_example](NIT_node-red_example) folder.  
There are 2 integration options and both have 2 flows: an uplink flow and a downlink flow.

1. Integration with a REST API  
   The example flow of this option is in the [ttn-rest-nodere.json](./NIT_node-red_example/ttn-rest-nodered.json) file.  
   - Open the _'Send UL to Location Solver'_ node and copy the DX API Access Token to the _'Token'_ field of the form.
   - In order to allow Node-RED to send (forward) downlink messages to TTN NS, you need to use an access key that can be set by editing 
     the javascript code of "TTN DL Interface" node in the Node-RED GUI. (Modify the value of `msg.key`)  
     You can get the TTN access key through the TTN console as it is explained at chapter at point 7. of the next chapter.
2. Integration with MQTT  
    The example flow of this option is in the [ttn-mqtt-nodered.json](./NIT_node-red_example/ttn-mqtt-nodered.json) file.  
    Please note that MQTT requires a messages broker too: - TTN NS publishes messages to a topic of the Message Broker - 
    The Node-RED demo server will subscribe to that messages and forward them to ThingPark X Location Engine
    In the MQTT example flows we assumed that the message broker is installed on the same machine as the Node-RED server. 
    You can update the MQTT parameters (url, credentials etc.) by editing the pink [mqtt subscribe] and [mqtt publish] nodes through the Node-RED GUI.

## Route your device messages from TTN to your Node-RED application

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
