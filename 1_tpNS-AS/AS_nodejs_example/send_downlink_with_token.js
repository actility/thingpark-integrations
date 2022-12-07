/* 
This code demonstrates how to send a LoRaWAN downlink message 
through the ThingPark Tunnel interface.
Please update the INPUT PARAMETERS before running this scipt!
*/

const https = require('https');
const crypto = require('crypto');
const moment = require('moment');

// ----------------------------------
// INPUT PARAMETERS (Please update them before running this script)
// ----------------------------------

const DOWNLINK_HOSTNAME = 'community.thingpark.io'
const DOWNLINK_PATH     = '/thingpark/lrc/rest/downlink'

const AS_KEY              = 'f3203a20a2e8dfaf6686b621f56d05e3'
const AS_ID               = 'TWA_100002167.1111.AS'

const DevEUI              = '20635F0108000495'
const FPort               = 2
const Payload             = '0103'    // Abeeway Position On Demand command
const Confirmed           = false     // optional, Possible values: Ture|False
const FlushDownlinkQueue  = false     // optional, Possible values: Ture|False
const ValidityTime        = undefined // optional, Example: "2018-10-17T16:38:46.882+02:00"
const CorrelationID       = undefined // optional, Example: "1234"

// ----------------------------------


// ----------------------------------
// Creating the query_string that is part of the request URL and is used to generate the token
// ----------------------------------

// 'DevEUI', 'FPort' and 'Payload' are mandatory part of the query_string
query_string = 'DevEUI=' + DevEUI + '&FPort=' + FPort.toString() + '&Payload=' + Payload;

// 'Confirmed', 'FlushDownlinkQueue' and 'ValidityTime' are optional part of the query_string
if (Confirmed) {
    query_string += '&Confirmed=1';
}
if (FlushDownlinkQueue) {
    query_string += '&FlushDownlinkQueue=1';
}
if (ValidityTime) {
    query_string += '&ValidityTime=' + ValidityTime;
}

// 'AS_ID' and 'Time' are mandatory part of the query_string
Time = moment().format();
query_string += '&AS_ID=' + AS_ID + '&Time=' + Time; 

// 'CorrelationID' is optional part of the query_string
if (CorrelationID) {
    query_string += '&CorrelationID=' + CorrelationID;
}

// 'Token' is mandatory part of the query_string
Token = crypto.createHash('sha256').update(query_string + AS_KEY).digest('hex');
query_string += '&Token=' + Token;

// The 'Time' parameter within the query_string includes ':' and '+' characters that have to be encoded
query_string = query_string.replace(/\:/gi, '%3A').replace(/\+/gi, '%2B');

// ----------------------------------

// console.log(query_string);

const req = https.request(
    {
        hostname: DOWNLINK_HOSTNAME,
        path: DOWNLINK_PATH + '?' + query_string,
        method: 'POST',
    },
    res => {
        console.log(`statusCode: ${res.statusCode}`);
        res.on('data', d => {
            console.log(d.toString(), '\n');
        });
    }
)

req.on('error', error => {
    console.error(error)
})
  
req.write('')
req.end()
