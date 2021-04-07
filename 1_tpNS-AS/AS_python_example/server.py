from flask import Flask, request
from datetime import datetime
import json

app = Flask(__name__)

@app.route('/', methods=['POST'])
def server():
    ''' This server saves the POST request body and query parameters into a local msg.log file, without 
    authenticating the sender. '''

    body = request.json
    body_txt = json.dumps(body, indent=4)

    query_params = {
        'LrnDevEui': request.args['LrnDevEui'],
        'LrnFPort': request.args['LrnFPort'],
        'LrnInfos': request.args['LrnInfos'],
        'AS_ID': request.args['AS_ID'],
        'Time': request.args['Time'],
        'Token': request.args['Token'],
    }
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
    app.run(host='0.0.0.0', port='8080')
