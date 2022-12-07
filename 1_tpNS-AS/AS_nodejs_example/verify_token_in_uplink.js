const crypto = require('crypto');

// This is the "Tunnel Interface Authentication Key" that was set through the ThingPark GUI at the time the Application/Routing Profile was created
const AS_KEY = 'f3203a20a2e8dfaf6686b621f56d05e3'

// These are the parsed, unquoted query parameters of the HTTP Request sent by ThingPark to the AS
// Please make sure that the Time property is really unquoted. Without that the Token is calculated in a wrong way.
const query_params = {
    'AS_ID': 'TWA_100002167.1111.AS',
    'LrnDevEui': '20635F0108000496',
    'LrnFPort': 17,
    'LrnInfos': 'TWA_100002167.1111.AS-1-111974',
    'Time': '2021-04-07T08:49:51.551+00:00',
    'Token': '196c22898bf95fcf48b72be198c89256410660b9b514539651344baa594ad74f'
}

// This is the parsed body of the HTTP POST request sent by ThingPark to the AS 
const body = {
    "DevEUI_uplink": {
        "Time": "2021-04-07T08:49:45.235+00:00",
        "DevEUI": "20635F0108000496",
        "FPort": 17,
        "FCntUp": 18,
        "MType": 2,
        "FCntDn": 2,
        "payload_hex": "032ce4850919d85d4c9f793ad148d24f32f3c6b5488f5a087cbeb1488f5a998c83ab",
        "mic_hex": "edf64cd8",
        "Lrcid": "000000CC",
        "LrrRSSI": -67,
        "LrrSNR": 9,
        "SpFact": 8,
        "SubBand": "G1",
        "Channel": "LC2",
        "DevLrrCnt": 1,
        "Lrrid": "10000036",
        "Late": 0,
        "LrrLAT": 47.438381,
        "LrrLON": 18.926418,
        "Lrrs": {
            "Lrr": [
                {
                    "Lrrid": "10000036",
                    "Chain": 0,
                    "LrrRSSI": -67,
                    "LrrSNR": 9,
                    "LrrESP": -67.514969
                }
            ]
        },
        "CustomerID": "100002167",
        "CustomerData": {
            "alr": {
                "pro": "ABEE/APY",
                "ver": "1"
            }
        },
        "ModelCfg": "0",
        "DriverCfg": {
            "mod": {
            "pId": "abeeway",
            "mId": "micro-tracker",
            "ver": "3"
            },
            "app": {
            "pId": "abeeway",
            "mId": "asset-tracker",
            "ver": "2"
            }
        },
        "InstantPER": 0,
        "MeanPER": 0,
        "DevAddr": "05AE3D2F",
        "AckRequested": 0,
        "rawMacCommands": "",
        "TxPower": 16,
        "NbTrans": 1,
        "DynamicClass": "A"
    }
}



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
calculated_token = crypto.createHash('sha256').update(body_elements + query_string_elements + AS_KEY).digest('hex');

// Compare the received_token with calculated_token. If they are not the same, the UL message is invalid
console.log(`Received token:   ${received_token}`)
console.log(`Calculated token: ${calculated_token}`)
if (received_token == calculated_token) {
    console.log('This is a valid Uplink Frame!')
} else {
    console.log('This is an INVALID Uplink Frame!')
}
