from flask import Flask, request
from datetime import datetime
import json

from werkzeug.wrappers import Request, Response
from hashlib import sha256

PORT = '8080'
AS_ID = 'TWA_100002167.1111.AS'
AS_KEY = 'f3203a20a2e8dfaf6686b621f56d05e3'

app = Flask(__name__)

@app.route('/', methods=['POST'])
def server():
    ''' This function validates an uplink frame and saves the POST request body and query 
    parameters into the local msg.log file. '''

    body = request.json
    query_params = request.args

    # Verify the UL frame
    if not verify_ul_frame(query_params, body, AS_ID, AS_KEY):
        return ('Authentication failed', 401)

    body_txt = json.dumps(body, indent=4)
    query_params_txt = json.dumps(query_params, indent=4)

    with open("msg.log", "a+") as messages_file_object:
        messages_file_object.write(
            "Date/Time: " + str(datetime.now()) + "\n" +
            "Query parameters: \n" +
            query_params_txt + "\n" +
            "Body: \n" +
            body_txt + "\n\n"
        )
    return ('', 204)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=PORT, debug=True)



def verify_ul_frame(query_params, body, as_id, as_key):

    if query_params['AS_ID'] != as_id:
        print('Invalid AS_ID!')
        return False

    # Pick the received token out from the query parameters
    received_token = query_params['Token']

    # Create a string called 'query_string_elements' as described in the Tunnel Interface Development Guide
    query_string_elements = (
        'LrnDevEui=' + query_params['LrnDevEui'] + "&" + 'LrnFPort=' + str(query_params['LrnFPort']) + "&" 
        + 'LrnInfos=' + query_params['LrnInfos'] + "&" + 'AS_ID=' + query_params['AS_ID'] + "&" 
        + 'Time=' + query_params['Time']
    )

    # Create a string called 'body_elements' as described in the Tunnel Interface Development Guide
    body_elements = (
        body['DevEUI_uplink']['CustomerID'] + body['DevEUI_uplink']['DevEUI'] 
        + str(body['DevEUI_uplink']['FPort']) + str(body['DevEUI_uplink']['FCntUp']) 
        + body['DevEUI_uplink']['payload_hex']
    )

    # Calculate a Token as described in the Tunnel Interface Development Guide
    calculated_token = sha256( (body_elements + query_string_elements + as_key).encode() ).hexdigest()

    # Compare the received_token with calculated_token. If they are not the same, the UL message is invalid
    print(received_token)
    print(calculated_token)
    
    if (received_token != calculated_token):
        print('Invalid Token!')
        return False

    print('This is a valid Uplink Frame!')
    return True
