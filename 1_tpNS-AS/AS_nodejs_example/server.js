const fs = require('fs');
const express = require('express');
const moment = require('moment');

const crypto = require('crypto');

const PORT = 8080;
const AS_ID = 'TWA_100002167.1111.AS'
const AS_KEY = 'f3203a20a2e8dfaf6686b621f56d05e3'

const app = express();

app.use(express.json())

app.post('/', (req, res) => {
    /* This function validates an uplink frame and saves the POST request body and query 
    parameters into the local msg.log file. */

    if ( !verify_ul_frame(req.query, req.body, AS_ID, AS_KEY) ) {
        res.status(401).send('Authentication failed');
        return;
    }

    let log 
    log  = '\nDate: ' + moment().format();
    log += '\nQuery params:\n' + JSON.stringify(req.query, null, 4); 
    log += '\nBody:\n' + JSON.stringify(req.body, null, 4) + '\n';
    fs.writeFile(
        'msg.log', log, 
        {'flag':'a+'},
        (err) => {
            if (err) throw err;
            console.log('Msg written into log file.')
        }
    );
    res.status(200).end();
    return;
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
})


let verify_ul_frame = (query_params, body, as_id, as_key) => {

    // Pick the received token out from the query parameters
    received_token = query_params['Token']

    // Create a string called 'query_string_elements' as described in the Tunnel Interface Development Guide
    query_string_elements = (
        'LrnDevEui=' + query_params['LrnDevEui'] + "&" + 'LrnFPort=' + query_params['LrnFPort'].toString() + "&" 
        + 'LrnInfos=' + query_params['LrnInfos'] + "&" + 'AS_ID=' + query_params['AS_ID'] + "&" 
        + 'Time=' + query_params['Time']
    )

    // Create a string called 'body_elements' as described in the Tunnel Interface Development Guide
    body_elements = (
        body['DevEUI_uplink']['CustomerID'] + body['DevEUI_uplink']['DevEUI'] 
        + body['DevEUI_uplink']['FPort'].toString() + body['DevEUI_uplink']['FCntUp'].toString() 
        + body['DevEUI_uplink']['payload_hex']
    )

    // Calculate a Token as described in the Tunnel Interface Development Guide
    calculated_token = crypto.createHash('sha256').update(body_elements + query_string_elements + as_key).digest('hex');

    // Compare the received_token with calculated_token. If they are not the same, the UL message is invalid
    console.log(`Received token:   ${received_token}`)
    console.log(`Calculated token: ${calculated_token}`)
    if (received_token == calculated_token) {
        console.log('This is a valid Uplink Frame!');
        return true;
    } else {
        console.log('This is an INVALID Uplink Frame!');
        return false;
    }
    
}
