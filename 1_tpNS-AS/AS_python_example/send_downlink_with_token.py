''' 
This code demonstrates how to send a LoRaWAN downlink message 
through the ThingPark Tunnel interface.
Please update the INPUT PARAMETERS before running this scipt!
'''

import requests
from datetime import datetime
from urllib.parse import quote
from hashlib import sha256

# ----------------------------------
# INPUT PARAMETERS (Please update them before running this script)
# ----------------------------------

DOWNLINK_BASE_URL = 'https://community.thingpark.io/thingpark/lrc/rest/downlink'

AS_KEY              = 'f3203a20a2e8dfaf6686b621f56d05e3'
AS_ID               = 'TWA_100002167.1111.AS'

DevEUI              = '20635F0108000496'
FPort               = 2
Payload             = '0103'   # Abeeway Position On Demand command
Confirmed           = False    # optional, Possible values: Ture|False
FlushDownlinkQueue  = False    # optional, Possible values: Ture|False
ValidityTime        = None     # optional, Example: "2018-10-17T16:38:46.882+02:00"
CorrelationID       = None     # optional, Example: "1234"

# ----------------------------------


Time = datetime.now().astimezone().isoformat()

# ----------------------------------
# Creating the query_string that is used to generate the token
# ----------------------------------
query_string = 'DevEUI=' + DevEUI + '&FPort=' + str(FPort) + '&Payload=' + Payload

if Confirmed:
    query_string += '&Confirmed=1'
if FlushDownlinkQueue:
    query_string += '&FlushDownlinkQueue=1'
if ValidityTime:
    query_string += '&ValidityTime=' + ValidityTime

query_string += '&AS_ID=' + AS_ID

# The 'Time' parameter of that version of the querystring that is in the Request need to be quoted (because it includes ':')
query_string_for_token = query_string + '&Time=' + Time
query_string           = query_string + '&Time=' + quote(Time) 

if CorrelationID:
    query_string_for_token += '&CorrelationID=' + CorrelationID
    query_string           += '&CorrelationID=' + CorrelationID

Token = sha256( (query_string_for_token + AS_KEY).encode() ).hexdigest()

query_string += '&Token=' + Token

resp = requests.post( DOWNLINK_BASE_URL + '?' + query_string )

print('HTTP POST:\n   ', resp.url)
print('Response code:\n   ', resp.status_code)
print('Response body:\n   ', resp.text)
