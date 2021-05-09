import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';

export default function InfoBar({ room, onClick }) {
    return (
        <Navbar bg="dark" variant="dark">
            <Link to="/chats" onClick={onClick}>
                <i className="fas fa-arrow-left"></i>
            </Link>
            <Navbar.Brand >
                {room}
            </Navbar.Brand>
        </Navbar>
    )
}
