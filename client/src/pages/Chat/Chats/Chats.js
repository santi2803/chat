import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Dropdown, DropdownButton } from 'react-bootstrap';
import socket from '../../../components/Socket';

export default class Chats extends Component {

    state = {
        user: ''
    }

    componentDidMount() {
        const userToLocalStorage = localStorage.getItem("user");
        if (!userToLocalStorage) {
            this.props.history.push("/")
        }
        this.setState({
            user: userToLocalStorage
        })
    }

    onClick(chat) {
        localStorage.setItem('actual_room', chat);
        socket.emit('connected', socket.id, localStorage.getItem('user'), chat);
        socket.off()
    }

    render() {
        const { user } = this.state;
        return (
            <Container className="container">
                <DropdownButton title={`${user} Selecciona un Chat`}>
                    {
                        chats.map(chat => {
                            return (
                                <Dropdown.Item 
                                    as={Link} 
                                    to={`/chats/${chat}`} 
                                    key={chat}
                                    onClick={() => this.onClick(chat)}
                                >
                                    {chat}
                                </Dropdown.Item>
                            )
                        })
                    }
                </DropdownButton>
            </Container>
        )
    }
}

const chats = ["Programacion", "Fisica", "Matematicas"]