const express = require('express');
const fetch = require('node-fetch');

const APIKEY = '2Q8CZ6UIJMYSMM1K9B57EQZ7I8TFGZ4X1B';
const CONTRACT = '0x0E3EAF83Ea93Abe756690C62c72284943b96a6Bc';
const BURN = '0x000000000000000000000000000000000000dead';
const PORT = process.env.PORT || 5000;

const app = express();

app.get('/api/circulating-supply', (req, res) => {
  fetch(`https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=${CONTRACT}&address=${BURN}&tag=latest&apikey=${APIKEY}`)
    .then(response => response.json())
    .then(json => {
      const burned = parseInt(json.result, 10) / 1000000000;
      const circulating = 1000000000000000 - burned;
      res.set('Content-Type', 'text/plain');
      res.write(circulating.toString());
      res.end();
    });
});


app.listen(PORT, function () {
  console.log(`Express server listening on port ${PORT}`)
});