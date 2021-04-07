import requests
from datetime import datetime
from urllib.parse import urlencode, quote, quote_plus
from hashlib import sha256

DOWNLINK_TUNNEL_URL = 'https://community.thingpark.io/thingpark/lrc/rest/downlink'
# DOWNLINK_TUNNEL_URL = 'https://webhook.site/8f043d76-534f-45d0-afdd-4460602c264c'
AS_KEY = 'f3203a20a2e8dfaf6686b621f56d05e3'

query_params = {
    "DevEUI": "20635F0108000496",
    "FPort": "2",
    "Payload": "0103", # Abeeway Position On Demand command
    # "Confirmed": "1", # optional
    # "FlushDownlinkQueue": "1" #optional
    # "ValidityTime": "2018-10-17T16:38:46.882+02:00", # optional
    "AS_ID": 'TWA_100002167.1111.AS',
    "Time": datetime.now().astimezone().isoformat(),
    # "CorrelationID": "1234" # optional
}

headers = { 
    'Content-Type': 'application/x-www-form-urlencoded' 
}

query_string = urlencode(query_params, quote_via = lambda x, *_: x)
Token = sha256( (query_string + AS_KEY).encode() ).hexdigest()

query_params['Token'] = Token
resp = requests.post( DOWNLINK_TUNNEL_URL, params=query_params, headers=headers )

print('HTTP POST:\n   ', resp.url)
print('Response code:\n   ', resp.status_code)
print('Response body:\n   ', resp.text)
