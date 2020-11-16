# ThingPark Integrations
This repository includes example code that demonstrates how to integrate Actility ThingPark components with 3rd party systems.  
A general overview of the integration architecture is described [here](./3rdPtyNS_integration.md).  
Most of the examples are in the form of Node-RED flows. In order to try them you need a Node-RED server that you can install either on your own machine locally or use it on IBM Cloud.
## Installing a Node-RED Server
We recommend you either installing a Nede-RED server on your own computer/server machine locally or test in on IBM cloud.  
The process of local installation is described here:  
https://nodered.org/docs/getting-started/local

If you prefer to test the solution on IBM cloud follow the procedure explined under the following link.  
https://nodered.org/docs/getting-started/ibmcloud

In case you just want to have a quick look at the flows without testing and/or modifying them, have a look at the read-only pre-installed examples at the following link:  
https://nano-things.net/red/

## Installing sample flows
All samples of this repository are stored in JSON files that you can import into your Node-RED installation as described under the following link:  
https://nodered.org/docs/user-guide/editor/workspace/import-export  
The source code of flows are collected in the following folders of this repository:  
- [tpx-location-engine-AS](./tpx-location-engine-AS)  
  Example flows to connect an Application Server to TPX Location Engine  
- [tpx-location-engine-NS](./main/tpx-location-engine-NS)  
  Example flows to connect the Network Server to TPX Location Engine  
- [tunnel-interface](./tunnel-interface)  
  Example flows to connect the ThingPark Wireless/Enterprise Network Server to an Application Server  
