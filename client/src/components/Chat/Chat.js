import React, { Component } from 'react';
import { Row, Col, FormControl, InputGroup, Button } from 'react-bootstrap';
import InfoBar from '../InfoBar/InfoBar';
import Message from '../Message/Message';
import UsersBar from '../UsersBar/UsersBar';
import socket from '../Socket'


export default class Chat extends Component {

    state = {
        users: [],
        user: "",
        messages: [],
        message: {},
        loading: true,
        actual_room: "",
        connected: {
            room: "",
            conn: false,
            msg: "",
            user: ""
        },
        leave: {
            room: "",
            msg: "",
            user: "",
            leave: false
        }
    }

    componentDidMount() {
        if (!localStorage.getItem('user')) {
            this.props.history.push("/")
        }

        this.setMessages();
        this.onConnected();
        this.onLeave();

        this.setState({
            loading: false,
            user: localStorage.getItem("user"),
            actual_room: localStorage.getItem('actual_room')
        });
    }

    componentDidUpdate() {
        this.onConnected();
    }

    onLoadMessage() {
        let { messages } = this.state;
        socket.on('messages', message => {
            messages = [...messages, message]
            localStorage.setItem('messages', JSON.stringify([...messages]));
            this.setState({
                messages
            })
        })
    }

    setMessages() {
        const msgs = JSON.parse(localStorage.getItem("messages"))
        let { messages } = this.state;
        if (localStorage.getItem("messages")) {
            messages = [...msgs]
            this.setState({
                messages
            });
        }
    }

    onConnected() {
        socket.on("connected", (msg, user, room, info) => {
            let { users } = this.state;
            users = info.users;
            this.setState({
                users, 
                connected: {
                    room,
                    conn: true,
                    msg,
                    user
                },
            })
        })
    }

    leave() {
        socket.emit("leave_room", this.state.user);
        localStorage.removeItem("actual_room");
    }

    onLeave() {
        socket.on("leave_room", (msg, user, room, info) => {
            let { users } = this.state;
            users = info.users;
            this.setState({
                users,
                leave: {
                    room,
                    user,
                    msg,
                    leave: true
                },
            })
        })
    }

    onChange(e) {
        let { message } = this.state;
        const { name, value } = e.target;
        message[name] = value;
        message['user'] = localStorage.getItem('user');
        message['date'] = new Date().toString();
        message['room'] = localStorage.getItem('actual_room');

        this.setState({
            message
        })
    }

    onSend(data) {
        socket.emit("message", data);
        let { message } = this.state;
        message.message = ''
        this.onLoadMessage();
    }

    onClick() {
        this.leave();
        localStorage.removeItem('actual_room');
    }

    onKeyPress(e) {
        const { message } = this.state;
        if (e.key === "Enter") {
            this.onSend(message);
        }
    }

    render() {
        const { message, messages, users, user, loading, actual_room, connected, leave } = this.state;
        if (!loading) {
            setTimeout(() => {
                const msgs = document.getElementById('messages');
                msgs.scrollTo(0, msgs.scrollWidth);
            }, 200)
        }
        function custom_sort(a, b) {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        }

        messages.sort(custom_sort);

        return (
            <Row className="row-chat">
                <Col sm="12">
                    <InfoBar room={this.props.match.params.chat} onClick={this.onClick.bind(this)} />
                </Col>
                <Col sm="3">
                    {
                        loading ? <h1>loading</h1> : actual_room in users ?
                            <UsersBar room={actual_room} users={users} /> :
                            <></>
                    }
                </Col>
                <Col>
                    {
                        loading ? <h1>Loading...</h1> : (
                            <div className="chat">
                                <div className="messages" id="messages">
                                    {
                                        messages.map((msg, i) => {
                                            if (msg.room === actual_room)
                                                return <Message msg={msg} user={user} key={i} />
                                            return <></>
                                        })
                                    }
                                    {
                                        connected.conn && connected.room === actual_room && connected.user !== user ? (
                                            <div className="connected_msg">{connected.msg}</div>
                                        ) : (
                                            <></>
                                        )
                                    }
                                    {
                                        leave.leave && leave.room === actual_room && leave.user !== user ? (
                                            <div className="disconnected_msg">{leave.msg}</div>
                                        ) : (
                                            <></>
                                        )
                                    }
                                </div>
                                <div>
                                    <InputGroup className="mb-3">
                                        <FormControl
                                            placeholder="Escriba aquí..."
                                            aria-label="Escriba aquí..."
                                            aria-describedby="basic-addon2"
                                            name="message"
                                            value={message.message}
                                            onKeyDown={this.onKeyPress.bind(this)}
                                            onChange={this.onChange.bind(this)}
                                            autoComplete="off"
                                        />
                                        <InputGroup.Append>
                                            <Button
                                                variant="outline-secondary"
                                                onClick={() => this.onSend(message)}
                                            >
                                                <i class="fas fa-paper-plane"></i>
                                            </Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </div>
                            </div>
                        )
                    }
                </Col>
            </Row>
        )
    }
}
