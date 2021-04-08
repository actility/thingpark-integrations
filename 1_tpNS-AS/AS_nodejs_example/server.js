const fs = require('fs');
const express = require('express');
const moment = require('moment');

const app = express();
const port = 8080;

app.use(express.json())

app.post('/', (req, res) => {
    let log 
    log  = '\nDate: ' + moment().format();
    log += '\nQuery params:\n' + JSON.stringify(req.query, null, 4); 
    log += '\nBody:\n' + JSON.stringify(req.body, null, 4) + '\n';
    fs.writeFile(
        'msg.log', log, 
        {'flag':'a+'},
        (err) => {
            if (err) throw err;
            console.log('Msg written into log file.')
        }
    );
    res.status(200).end()
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
