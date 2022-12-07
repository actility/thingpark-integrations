''' 
This code demonstrates how to send a LoRaWAN downlink message 
through the ThingPark Tunnel interface.
Please update the INPUT PARAMETERS before running this scipt!
'''

from datetime import datetime
from hashlib import sha256
from requests import post

# ----------------------------------
# INPUT PARAMETERS (Please update them before running this script)
# ----------------------------------

DOWNLINK_BASE_URL = 'https://community.thingpark.io/thingpark/lrc/rest/downlink'

AS_KEY              = 'f3203a20a2e8dfaf6686b621f56d05e3'
AS_ID               = 'TWA_100002167.1111.AS'

DevEUI              = '20635F0108000495'
FPort               = 2
Payload             = '0103'   # Abeeway Position On Demand command
Confirmed           = False    # optional, Possible values: Ture|False
FlushDownlinkQueue  = False    # optional, Possible values: Ture|False
ValidityTime        = None     # optional, Example: "2018-10-17T16:38:46.882+02:00"
CorrelationID       = None     # optional, Example: "1234"

# ----------------------------------


# ----------------------------------
# Creating the query_string that is part of the request URL and is used to generate the token
# ----------------------------------

# 'DevEUI', 'FPort' and 'Payload' are mandatory part of the query_string
query_string = 'DevEUI=' + DevEUI + '&FPort=' + str(FPort) + '&Payload=' + Payload

# 'Confirmed', 'FlushDownlinkQueue' and 'ValidityTime' are optional part of the query_string
if Confirmed:
    query_string += '&Confirmed=1'
if FlushDownlinkQueue:
    query_string += '&FlushDownlinkQueue=1'
if ValidityTime:
    query_string += '&ValidityTime=' + ValidityTime

# 'AS_ID' and 'Time' are mandatory part of the query_string
Time = datetime.now().astimezone().isoformat()
query_string += '&AS_ID=' + AS_ID + '&Time=' + Time 

# 'CorrelationID' is optional part of the query_string
if CorrelationID:
    query_string += '&CorrelationID=' + CorrelationID

# 'Token' is mandatory part of the query_string
Token = sha256( (query_string + AS_KEY).encode() ).hexdigest()
query_string += '&Token=' + Token

# The 'Time' parameter within the query_string includes ':' and '+' characters that have to be encoded
query_string = query_string.replace(':', '%3A').replace('+', '%2B')

# ----------------------------------

response = post( DOWNLINK_BASE_URL + '?' + query_string )

print('HTTP POST:\n   ', response.url)
print('Response code:\n   ', response.status_code)
print('Response body:\n   ', response.text)
