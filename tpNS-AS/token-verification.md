# Token Verification Procedure

1. The NS sends the following message to the AS
   ```
   curl \
     -X POST \
     -H "Content-type:application/json"  \
     -d '{ "DevEUI_uplink": { ... "DevEUI": "000000000F1D8693", "FPort": "2", "FCntUp": "7011", "payload_hex": "0027bd00", "CustomerID": "100000507" ... } }' \
     "<as-url>?LrnDevEui=000000000F1D8693&LrnFPort=2&LrnInfos=UPHTTP_LAB_LORA&AS_ID=app1.sample.com&Time=2016-01-11T14%3A11%3A11.333%2B02%3A00&Token=fd0b0b00464aa798a59282d64eaa70813e33bff87682880db49638569d096aad"
   ```
2. The AS cuts out the `queryParameters` subsring from the original query string of the http request __without__ the Token
   ```
   queryParameters = 
   "LrnDevEui=000000000F1D8693&LrnFPort=2&LrnInfos=UPHTTP_LAB_LORA&AS_ID=app1.sample.com&Time=2016-01-11T14%3A11%3A11.333%2B02%3A00"
   ```
3. The AS builds the `bodyElements` string as the concatenation - without separator - of the following values taken from the http request body:
   ```
   bodyElements = CustomerID + DevEUI + FPort + FCntUp + payload_hex
   ```
   The concatenation of the above described sample data looks like this: `"100000507000000000F1D8693270110027bd00"`

4. The AS re-computes the `Token` as: 
   ```
   Token = SHA-256(bodyElements + queryParameters + AsKey)
   ```
   Where: `AsKey` is the 128 bits pre-shared Tunnel Interface Authentication Key (lower case hexadecimal string representation) 
   between the AS and the NS as defined in the Generic Application configuration.

5. The AS compares the calculated Token with the received token (in the query string). If the two are not the same the AS drops the uplink frame.
6. 