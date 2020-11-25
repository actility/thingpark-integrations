# Set up your Node RED connector
Set up your Node RED server and App as it is describe [here](https://github.com/actility/thingpark-integrations)  
You can find example app configuration files (in JSON format) in this folder.  

# Route your device messages from TTN to your Node-RED application
1. Login to TTN console here:  
   [https://console.thethingsnetwork.org/](https://console.thethingsnetwork.org/)
2. From the main console mage select "__APPLICATIONS__" and click on the green "__+ add application__" button to create a new application
3. Fill in the form and click on the "__Add application__" button on the bottom of the page.  
   Example values may be as follows: 
      - Application ID: ___nodered-tpxle-connector___
      - Description: ___Node RED connector App for TPX Location Engine___
      - Application EUI: ___EUI is issued by The Things Network___
      - Handler registration: ___ttn-handler-eu___
4. After you have created (added) your new application, you need to configure it in 2 steps:  
   - Manage your Application EUIs
   - Register your Devices
5. Click on "__manage euis__" in the "__APPLICATION EUIS__ section andd add a new App EUI that is the App EUI of your device.  
   _Don't accept any value suggested to be generated automatically. Set your own value._  
    An example App EUI value is the following: 
    - Add EUI: ___20 63 5f 00 01 00 00 13___
6. Register devices by clicking on "__register device__" in the "__DEVICES__" section     
   _Don't accept any values suggested to be generated automatically. Set your own values._  
   Example values may be as follows: 
      - Device ID: ___abeeway-smart-badge-01___
      - Description: ___Abeeway Smart Badge 01___
      - Device EUI: ___20 63 5F 01 00 00 00 01___
      - App Key: ___00 11 22 33 44 55 66 77 88 99 AA BB CC DD EE FF___
      - App EUI: ___20 63 5f 00 01 00 00 13___  _(select the one you have just added)_
7. Record (copy it to the clipboard) the __default key__ under the __ACCESS KEYS__ section. You will need it when you set up your Node-RED connector. 



