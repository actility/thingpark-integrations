# Integrating Abeeway devices and ThingPark X Location Engine with any 3rd party LoRaWAN Network Server
## Introduction
This document explains how to set up a lab environment for testing the unique features of [Abeeway][abeeway] tracker devices with different types of LoRaWAN Network Servers. The lab environment requires the following components:

0. **BLE beacons / WiFi routers**  
   _These components are required only in case you want to test the BLE/WiFi scan feature of the trackers_
1. **[Abeeway][abeeway] trackers**
2. **A [LoRaWAN][lorawan] Network**  
   _A network is built from LoRaWAN Gateways and a LoRaWAN Network Server. In this tutorial we assume that the network is already present and offers reliable connectivity at the test area._  
3. **An interface converter application**  
   _It is a proxy application that translates messages between the LoRaWAN Network Server and the Location Solver. We will explain how you can develop your own interface proxy utilizing our [Node-RED][node-red] examples. (Please note that this component is not needed if you are using Actility Thingpark in the cloud.)_
4. **[ThingPark X Location Engine][actility-tpl] (TPXLE)**  
   _TPXLE is Actility's Location Solver in the cloud_
5. **Application Servers**  
   _Application servers will visualize the location data reported by trackers. In our demo environment we will use 2 application servers:_   
   * **The Abeeway Device Analiser (ADA)**  
     _ADA is a demo application server provided by Actility in the cloud to test and configure Abeeway trackers_
   * **A test application server**  
     _We will explain how to build your own application server based on [Node-RED][node-red]_

These components are also presented on Figure 1 below. Blue color represents components from Actility and Abeeway, orange color represents componets that we plan to develop ourselves and white components are from 3rd parties.

![Fig01](Fig01.png)
_Figure 1. - The components of the planned test environment_


We will explain and present example code on how to integrate the above-listed components with the following network servers:
 * [Actility][actility] [ThingPark Wireless][actility-tpw] or [ThingPark Enterprise][actility-tpe]  
   _This integration is only needed in case of On-Customer-Premise (OCP) deployments. SaaS platforms already have te necessary interfaces._
 * [The Things Network][ttn] (TTN)
 * [Loriot][loriot]
 * [Senet](https://www.senetco.com/)
 * [Multitech][multitech-lns]
 * [Kerlink][kerlink] [Wanesy][kerlink-wanesy]
 
## The main steps to set up the lab
The main steps to set up the lab enviroment are the following:

### Verify your ThingPark Subscriber Credentials
1. Log in to ThingPark subscriber Portal
2. Open the Device Managger Application and provision your Abeeway Devices
3. Open Abeeway Device Analyser and check if you can select the provisioned devices
4. Create a never expiring API Token using the Swagger UI of DX Core API 

### Send device messages to a node-RED application server
We will deploy the following message flow:  
**[Device]->[Gateway]->[Network Server]->[App Server]**
1. Set up a LoRaWAN network that offers reliable LoRaWAN connectivity for your Abeeway trackers
2. Set up a node-RED application server and make it available through the Internet
3. Provision your trackers on the LoRaWAN network server and set up message routing to your node-RED application server 
4. Turn on your trackers and check if their messages arrive at the node-RED app server

### Insert ThingPark X Location Engine in the uplink message flow
We will deploy the following message flow:  
[Device]->[Gateway]->[Network Server]->**[i/f Translator]->[Location Engine]**->[App Server]
1. Write a node-RED flow that
   * receives messages from your Network Server,
   * translates them for the API of ThingPark X Location Engine
   * forwads translated messages to ThingPark X Location Engine using your API key
2. Configure ThingPark X Location Engine so that it forwards resolved locations to the node-RED app server
3. Write a node-RED flow that
   * receives messages from ThingPark X Location Engine
   * presents messages on a map

### Verify uplink messages in your app and Abeeway Device Analyser application
1. Log In to the ThingPark Subscriber Portal
2. Open the Abeeway Device Analyser and check if device messages are shown up on the map

### Insert ThingPark X Location Engine in the downlink message flow
We will deploy the following message flow:  
[ADA]->**[Location Engine]->[i/f Translator]**->[Network Server]->[Gateway]->[Device]
1. Write a node-RED flow that
   * receives downlink messages from ThingPark X Location Engine,
   * translates them for the API of the downlink API of your Network Server
   * forwads translated messages to your Network server
### Verify that downlink messages sent from ADA are sent to devices properly
1. Send a downlink configuration command to a tracker from ADA
2. Verify with a node-RED debug node that it arrives at your node-RED app and is properly forwarded to your NS
3. Check in your NS logs that the message was delivered to the device



[lorawan]: https://lora-alliance.org/about-lorawan
[abeeway]: https://www.abeeway.com/
[actility]: https://www.actility.com/
[actility-tpw]: https://www.actility.com/public-iot-connectivity-solutions/
[actility-tpe]: https://www.actility.com/enterprise-iot-connectivity-solutions/
[actility-tpl]: https://www.actility.com/multi-technology-geolocation-solutions/
[ttn]: https://www.thethingsnetwork.org/
[loriot]: https://www.loriot.io/
[multitech]: https://www.multitech.net/ 
[multitech-lns]: https://www.multitech.net/developer/software/lora/lora-network-server/
[kerlink]: https://www.kerlink.com 
[kerlink-wanesy]: https://www.kerlink.com/iot-portfolio-and-technologies/connectivity-as-a-service/wanesy-naas/
[node-red]: https://nodered.org/
