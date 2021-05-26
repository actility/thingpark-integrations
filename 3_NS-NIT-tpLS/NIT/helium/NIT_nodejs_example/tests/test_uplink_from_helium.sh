#!/bin/bash

CLIENT_ID=<YOUR_CLIENT_ID>
CLIENT_SECRET=<YOUR_CLIENT_SECRET>

curl -i -X POST \
-H "content-type: application/json" \
-H "x-client-id: ${CLIENT_ID}" \
-H "x-client-secret: ${CLIENT_SECRET}" \
-d "@ulplink_data_sample_from_helium.json" \
http://localhost:8081/uplink_from_helium
