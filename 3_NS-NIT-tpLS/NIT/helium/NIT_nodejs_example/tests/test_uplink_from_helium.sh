#!/bin/bash

CLIENT_ID=community-api/norbert.herbert+cmty@actility.com
CLIENT_SECRET=n0Rabab@1234

curl -i -X POST \
-H "content-type: application/json" \
-H "x-client-id: ${CLIENT_ID}" \
-H "x-client-secret: ${CLIENT_SECRET}" \
-d "@ulplink_data_sample_from_helium.json" \
http://localhost:8081/uplink_from_helium
