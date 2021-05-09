const express = require('express');
const http = require('http');
const socket = require('socket.io');

const app = express();

app.set('port', process.env.PORT || 4000);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);

const io = socket(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});

io.on('connection', socket => {
    socket.on('connected', (user, room) => {
        io.emit("connected", user + " conectado ", room)
    })

    socket.on("message", message => {
        io.emit("messages", message);
    })
})


server.listen(app.get('port'), () => console.log('\n\t[::]Server Listening on port', app.get('port')));