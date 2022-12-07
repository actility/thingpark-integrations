

import express, { json } from 'express';
import { stringify } from 'querystring';
import fetch from 'node-fetch';
import { createClient } from 'redis';
import { promisify } from 'util';

import { uplink, downlink } from './nit-helium.js';

const NIT_SERVER_PORT = 8081;
const TPXLE_FEED_URL = "https://dx-api.thingpark.io/location/latest/api/feeds";
const TOKEN_REQUEST_URL = "https://dx-api.thingpark.io/admin/latest/api/oauth/token";

const app = express();

const redis_client = createClient({
    host: 'redis',
    port: 6379,
    // password: '<password>'
});
redis_client.on('error', err => {
    console.log('Error ' + err);
});
const setAsync = promisify(redis_client.set).bind(redis_client);
const getAsync = promisify(redis_client.get).bind(redis_client);

app.use(json())
app.post('/uplink_from_helium', (req, res) => {

    setAsync(`helium_downlink_urls:${req.body.dev_eui}`, req.body.downlink_url)
    .catch(err => console.error(err))
    .then(redis_save_status => {
        console.log(`redis_save_status:${redis_save_status}`);
    })

    let translated_body;
    try {
        translated_body = uplink(req.body);
    }
    catch(err) {
        console.log(err);
        res.status(400).send("invalid request body\n");
        return;
    }

    fetch(
        TOKEN_REQUEST_URL,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
            },
            body: stringify ({
                grant_type: 'client_credentials',
                client_id: req.headers['x-client-id'],
                client_secret: req.headers['x-client-secret']
            })
        }
    )
    .catch(err => console.error(err))
    .then(res1 => {
        console.log(`res1 statusCode: ${res1.status} ${res1.statusText}`);
        return res1.json()
    })
    .catch(err => console.error(err))
    .then(json => {
            let authorization_header = 'Bearer ' + json.access_token;
            console.log(authorization_header, '\n');
            return authorization_header;
    })
    .catch(err => console.error(err))
    .then(authorization_header => {
        console.log(JSON.stringify(translated_body, null, 2));
        return fetch(
            TPXLE_FEED_URL,
            {
                method: 'POST',
                headers: {
                    'Authorization': authorization_header,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(translated_body)
            }
        );
    })
    .catch(err => console.error(err))
    .then( res2 => {
        console.log(`res2 statusCode: ${res2.status} ${res2.statusText}`);
        return res2.text();
    })
    .catch(err => console.error(err))
    .then(text => {
        console.log(text)
    })

    res.status(200).end();
    return;
    
});

app.post('/downlink_to_helium', (req, res) => {

    console.log(`downlink to: ${req.body.deveui}`);

    getAsync(`helium_downlink_urls:${req.body.deveui}`)
    .catch(err => console.error(err))
    .then(helium_downlink_url => {
        console.log(`helium_downlink_url: ${helium_downlink_url}`);
        if (!helium_downlink_url) {
            throw new Error(`downlink url for dev_eui:${req.body.deveui} does not exist in the DB yet`)
        }
        return fetch(
            helium_downlink_url,
            {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                }
            }
        );
    })
    .catch(err => console.error(err))
    .then(res1 => {
        console.log(`res1 statusCode: ${res1.status} ${res1.statusText}`);
        return res1.text()
    })
    .catch(err => console.error(err))
    .then(text => {
        console.log(text)
    })


    // res.write()
    res.status(200).end();
    return;

});


app.get('/test', (req, res) => {

    res.write("The server works\n");
    res.status(200).end();
    return;

});

app.listen(NIT_SERVER_PORT, () => {
  console.log(`Example app listening at http://localhost:${NIT_SERVER_PORT}`);
});
