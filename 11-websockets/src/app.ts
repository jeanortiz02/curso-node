import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', function connection(ws) {

    console.log('Client Connected');

  ws.on('error', console.error);

  ws.on('message', function message(data) {
    // console.log('Desde el cliente: %s', data);

    // TODO: Enviar la data al cliente de regreso
    // ws.send(data.toString().toUpperCase());

    // * Todos incluyente 
    // wss.clients.forEach(function each(client) {
    //   if (client.readyState === WebSocket.OPEN) {
    //     client.send(data, { binary: false });
    //   }
    // })


    // * Todos excluyente 
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: false });
      }
    });

  });

  ws.send('Hola desde el servidor');
});

console.log('WebSocket Server Running on http://localhost:3000');