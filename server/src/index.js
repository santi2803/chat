const express = require('express');
const http = require('http');
const socket = require('socket.io');

const app = express();

app.set('port', process.env.PORT || 4000);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);

const rooms = {
    Programacion: {},
    Fisica: {},
    Matematicas: {}
};

const io = socket(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});

io.on('connection', socket => {
    socket.on('connected', (id, user, room) => {
        saveDataOfRoom(id, user, room);
        //io.sockets.in(room).emit('connected', {room, users: getUsersOfRoom(room)})
        if (room in rooms) {
            io.emit("connected", user + " se a unido a esta sala ", user, room, { users: getUsersOfRoom(room) });
        }
    });

    socket.on("message", message => {
        io.emit("messages", message);
    });

    socket.on("leave_room", (user) => {
        const { roomName } = searchBySocketId(socket.id);
        deleteUserFromRoom(socket.id, roomName);
        io.emit('leave_room', user + " ha abandonado la sala", user, roomName, { users: getUsersOfRoom(roomName) });
    })
})

const saveDataOfRoom = (id, user, roomName) => {
    let room = rooms[roomName];
    room[id] = user;
}

const getUsersOfRoom = (roomName) => {
    return Object.values(rooms[roomName]);
}

const searchBySocketId = (socketId) => {
    for (const roomName in rooms) {
        const existInRoom = socketId in rooms[roomName];
        if (existInRoom) {
            return { roomName, user: rooms[roomName][socketId] }
        }
    }

    return { roomName: null, user: null }
}

const deleteUserFromRoom = (socketId, roomName) => {
    if (socketId in rooms[roomName]) {
        delete rooms[roomName][socketId]
    }
}

server.listen(app.get('port'), () => console.log('\n\t[::]Server Listening on port', app.get('port')));