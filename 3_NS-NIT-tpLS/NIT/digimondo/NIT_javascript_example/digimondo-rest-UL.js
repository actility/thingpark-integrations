/******************************************/
/*** Digimondo UL interface                 ***/
/******************************************/

/* This part of code is only needed if the function is used in nodered! */
/*
body = (typeof msg.payload == 'string') ? JSON.parse(msg.payload) : msg.payload;
msg.payload = translate(body);
return msg;
*/

function translate(body) {

    let feeds = {
        // deviceEUI: "",                                     // mandatory
        // time: "",
        // coordinates: [],                                   // [longitude, latitude, altitude]
        // used if NS provides resolved coordinates
        solverInput: {
            solverInputType: "FeedInputForGenericSolver",
            // sequenceNumber: 1,                             // LoRaWAN FCntUp
            // port: 1,                                       // LoRaWAN FPort
            // receptionTime: "",
            // SF: 12,                                        // LoRaWAN Spreading Factor
            packets: [
                // {
                // baseStationId: "0805022D",
                // antennaId: 0,
                // antennaCoordinates: [7.0513, 43.6181], // [longitude, latitude, altitude]
                // antennaHeight: 150,                    // in cm
                // SNR: 10,                               // in dB
                // RSSI: -29,                             // in dBm
                // barometerMeasure: 0,                   // in mB
                // arrivalSeconds: 1,                     // in seconds
                // arrivalAdditionalNanos: 7275           // in nanoseconds
                // }
            ]
            // dynamicMotionState: "string",    // ['MOVING', 'STATIC', 'UNKNOWN']
            // temperatureMeasure: 0,           // in Celsius
            // accelerometerMeasures: [],       // measures per axis, i.e. [x, y, z]
            // gyroscopeMeasures: [],           // measures per axis, i.e. [roll, pitch, yaw]
            // barometerMeasure: 0,             // in mBar
            // lastContext: "string"            // Base64 encoded binary solver state
            // with the last calculated position
        },
        payload: {
            deviceProfileId: "ABEEWAY/MICRO",   // Currently only Abeeway Microtracker and
            // Industrial Tracker are supported. "deviceProfileId"
            // should be set to "ABEEWAY/MICRO" for both
            payloadEncoded: ""
        }
    }

    if ('device_eui' in body.up_packet) {
        feeds.deviceEUI = body.up_packet.device_eui;
    }
    else {
        throw new Error("Missing property: device_eui");
    }

    if ('received_at' in body.up_packet) {
        feeds.time = body.up_packet.received_at;
        feeds.solverInput.receptionTime = body.up_packet.received_at;
    }
    if ('fcnt' in body.up_packet) {
        feeds.solverInput.sequenceNumber = body.up_packet.fcnt;
    }
    if ('port' in body.up_packet) {
        feeds.solverInput.port = body.up_packet.port
    }
    if ('spreading_factor' in body.up_packet) {
        feeds.solverInput.SF = body.up_packet.spreading_factor
    } else { feeds.solverInput.SF = 10; }

    if ('gwrx' in body.up_packet) {
        if (('gwrx' in body.up_packet) && Array.isArray(body.up_packet.gwrx)) {
            let gateways = body.up_packet.gwrx;
            let packet;
            for (let i = 0; i < gateways.length; i++) {
                packet = {};
                if ('gweui' in gateways[i]) {
                    packet.baseStationId = gateways[i].gweui;
                }
                if ('lsnr' in gateways[i]) {
                    packet.SNR = gateways[i].lsnr;
                }
                if ('rssi' in gateways[i]) {
                    packet.RSSI = gateways[i].rssi;
                }
                if ('ant' in gateways[i]) {
                    packet.antennaId = gateways[i].ant;
                }
                
                if ('stat' in gateways[i]) {
                
                    if (
                        ('long' in gateways[i].stat) &&
                        ('lati' in gateways[i].stat)
                    ) {
                        packet.antennaCoordinates = [
                            gateways[i].stat.long,
                            gateways[i].stat.lati
                        ];
                        if ('alti' in gateways[i].stat) {
                            packet.antennaCoordinates.push(gateways[i].stat.alti);
                        }
                    }
                    
                }                
                
                feeds.solverInput.packets.push(packet);
            }
        }
    }

    if ('payload' in body.up_packet) {
        feeds.payload.payloadEncoded = body.up_packet.payload; 
    }

    return feeds;

}
