const http = require("http");
const dotenv = require("dotenv");
const app = require("./app");
 const userSocketConnection = require("./Controllers/socketcontroller");
dotenv.config()
const socketIO = require('socket.io');
const Port = process.env.PORT;
const server = http.createServer(app);

const io = socketIO(server);

var usp = io.of('/user-namespace')

usp.on('connection', (socket) => {
    try {
      userSocketConnection(socket);
    } catch (error) {
      console.error('Error in userSocketConnection:', error);
    }
  });


 
server.listen(Port, () => {
    console.log("Server is Running...");
})

                            