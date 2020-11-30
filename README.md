# ThingPark Integrations

This repository includes example codes that demonstrate how to integrate Actility ThingPark components with 3rd party systems. A general overview of the integration architecture is described [here](./3rdPtyNS_integration.md).

Most of the examples are in the form of Node-RED flows. In order to try them you need a Node-RED server that you can install either on your own machine locally or use it on IBM Cloud.  
For more information on how to install a Nore-RED and import flows read our [Node-RED quick-start guide](./Node-RED-quick-start.md).

The folders of this repository are organized as follows:

- [ThingParkLocationSolver-AS](./ThingParkLocationSolver-AS)  
  Example code samples and flows to connect TPX Location Engine to an Application Server
- [NS-ThingParkLocationSolverS](./NS-ThingParkLocationSolver)  
  Example code samples and flows to connect a LoRaWAN Network Server to TPX Location Engine
  - [Kerlink](./NS-ThingParkLocationSolver/kerlink)
  - [Loriot](./NS-ThingParkLocationSolver/loriot)
  - [Multitech](./NS-ThingParkLocationSolver/multitech)
  - [Senet](./NS-ThingParkLocationSolver/senet)
  - [The Things Network](./NS-ThingParkLocationSolver/the-things-network)
- [ThingParkNS-AS](./ThingParkNS-AS)  
  Example code samples and flows to connect ThingPark Wireless/Enterprise Network Server to an Application Server
