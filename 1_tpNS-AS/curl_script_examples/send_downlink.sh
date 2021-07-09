url='community.thingpark.io/thingpark/lrc/rest/downlink'

DevEUI="000000000F1D8693"
FPort="1"
Payload="00"
AS_ID="app1.sample.com"
Time="2016-01-11T14%3A28%3A00.333%2B02%3A00"
Token="ea8f31d2299cbece8e180a3012766c4df15fe3cf2e142d9fdf4035b5894ec886"

curl \
  -H "Content-type:application/x-www-form-urlencoded" \
  -X POST "$url?DevEUI=$DevEUI&FPort=$FPort&Payload=$Payload&AS_ID=$AS_ID&Time=$Time&Token=$Token"
