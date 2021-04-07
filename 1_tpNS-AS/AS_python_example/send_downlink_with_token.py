import requests
from datetime import datetime
from urllib.parse import urlencode
from hashlib import sha256

# Set the right downlink URL for your platform!
DOWNLINK_TUNNEL_URL = 'https://community.thingpark.io/thingpark/lrc/rest/downlink'

# This is the "Tunnel Interface Authentication Key" that was set through the ThingPark GUI at the time the Application/Routing Profile was created
AS_KEY = 'f3203a20a2e8dfaf6686b621f56d05e3'

# Here you can set the downlink parameters
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

# "lambda x, *_: x" is a function that assigns the 1st input parameter as a return value
# it is needed to perform urlencoding without quoting the content
query_string = urlencode(query_params, quote_via = lambda x, *_: x)
Token = sha256( (query_string + AS_KEY).encode() ).hexdigest()

query_params['Token'] = Token
resp = requests.post( DOWNLINK_TUNNEL_URL, params=query_params, headers=headers )

print('HTTP POST:\n   ', resp.url)
print('Response code:\n   ', resp.status_code)
print('Response body:\n   ', resp.text)
