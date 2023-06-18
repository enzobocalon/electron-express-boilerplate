import express from 'express'
import { IServerFeedback } from '../types/ServerFeedback';
import { Server } from 'http';
const app = express();

let server: Server;
let serverFeedback: IServerFeedback = {
  started: false,
  message: ''
};

// Define your server routes and logic here

export function startServer(host = 'localhost', port = 3000): IServerFeedback {
  app.get('/', (_, res) => {
    res.send('Hello World')
  })
  server = app.listen(port, () => {
    console.log(`Server is running on http://${host}:${port}`)
  });

  if (server) {
    serverFeedback = {
      started: true,
      message: `Server is running on http://${host}:${port}`
    };
  }

  return serverFeedback;
}

export function stopServer(): IServerFeedback {
  server.close();
  serverFeedback = {
    started: false,
    message: 'Server is stopped'
  }
  return serverFeedback;
}