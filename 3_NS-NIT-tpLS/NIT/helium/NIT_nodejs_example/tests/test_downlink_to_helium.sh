curl -i -X POST \
-H 'content-type: application/json' \
-d '{
    "type": "downlink",
    "deveui": "20635F0108000496",
    "port": "2",
    "payload": "0500"
}' \
http://localhost:8081/downlink_to_helium
