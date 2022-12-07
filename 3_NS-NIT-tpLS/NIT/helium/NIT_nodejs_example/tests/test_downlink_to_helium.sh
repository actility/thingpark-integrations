curl -i -X POST \
-H 'content-type: application/json' \
-d '{
    "type": "downlink",
    "deveui": "<YOUR_DEVEUI>",
    "port": "2",
    "payload": "0500"
}' \
http://localhost:8081/downlink_to_helium
