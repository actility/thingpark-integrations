import requests
import json

SERVER_URL = 'http://localhost:8080/'

# Example query parameters
query_params = {
    'LrnDevEui': '20635F0108000496',
    'LrnFPort': 17,
    'LrnInfos': 'TWA_100002167.1111.AS-1-111974',
    'AS_ID': 'TWA_100002167.1111.AS',
    'Time': '2021-04-07T08:49:51.551+00:00',
    'Token': '196c22898bf95fcf48b72be198c89256410660b9b514539651344baa594ad74f'
}

# Example body of an uplink message
body = {
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

# Example http headers
headers = { 
    'Content-Type': 'application/json' 
}

# Send the test message
resp = requests.post( SERVER_URL, params=query_params, headers=headers, data=json.dumps(body) )

print('HTTP POST:\n   ', resp.url)
print('Response code:\n   ', resp.status_code)
print('Response body:\n   ', resp.text)
