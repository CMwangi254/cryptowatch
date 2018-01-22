'use strict';

let WSServer = require('ws').Server;
let server = require('http').createServer();
let app = require('./app');
const cc = require('cryptocompare')

/*cc.coinList()
.then(coinList => {
  console.log(coinList);
})
.catch(console.error)*/

var prices = "2345"

cc.price('BTC', ['EUR','USD'])
.then(prices => {
  console.log(prices)
  // -> { USD: 1100.24, EUR: 1039.63 }
})
.catch(console.error)


cc.price('ETH', ['EUR','USD'])
.then(prices => {
  console.log(prices)
  // -> { USD: 1100.24 }
})
.catch(console.error)

cc.price('DASH', ['EUR','USD'])
.then(prices => {
  console.log(prices)
  // -> { USD: 1100.24 }
})
.catch(console.error)

// Create web socket server on top of a regular http server
let wss = new WSServer({

  server: server
});

// Also mount the app here
server.on('request', app);

wss.on('connection', function connection(ws) {

  ws.on('message', function incoming(message) {

    console.log(`received: ${message}`);

    ws.send(JSON.stringify({

      answer: 42
    }));
  });
});


server.listen(process.env.PORT, function() {

  console.log(`http/ws server listening on ${process.env.PORT}`);
});