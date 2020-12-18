# ThingPark Integrations

This repository includes example codes that demonstrate how to integrate Actility ThingPark components with 3rd party systems. A general overview of the integration architecture is described [here](./3rdPtyNS_integration.md).

Most of the examples are in the form of Node-RED flows. In order to try them you need a Node-RED server that you can install either on your own machine locally or use it on IBM Cloud.  
For more information on how to install a Nore-RED and import flows read our [Node-RED quick-start guide](./Node-RED-quick-start.md).

The folders of this repository are organized as follows:

- [tpLS-AS](./tpLS-AS)  
  Example code samples and flows to connect ThingPark Location Solver (tpLS) to an Application Server (AS)
- [NS-NIT-tpLS](./NS-NIT-tpLS)  
  Example code samples and flows to connect different 3rd party Network Servers (NS) to ThingPark Location Solver 
  (tpLS) through a Network Interface Translator (NIT) application. Node-RED samples for NIT deployment are 
  available for the following 3rd party network servers under the hyperlinks:
  - [Kerlink](./NS-NIT-tpLS/kerlink)
  - [Loriot](./NS-NIT-tpLS/loriot)
  - [Multitech](./NS-NIT-tpLS/multitech)
  - [Senet](./NS-NIT-tpLS/senet)
  - [The Things Network](./NS-NIT-tpLS/the-things-network)
- [ThingParkNS-AS](./tpNS-AS)  
  Example code samples and flows to connect ThingPark Wireless/Enterprise Network Server to an Application Server
