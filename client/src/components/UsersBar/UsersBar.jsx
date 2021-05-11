import React from 'react';
import { Nav } from 'react-bootstrap';

export default function UsersBar({ users, room }) {
    return (
        <Nav className="col-md-12 d-md-block bg-dark p-4 user-bar">
            {
                users[room].map(user => {
                    if (user === localStorage.getItem('user')) {
                        return (
                            <Nav.Item className="item mei p-4" key={user}>
                                <span>{user}</span>
                                <div className="icon"></div>
                            </Nav.Item>
                        )
                    }
                    return (
                        <Nav.Item className="item p-4" key={user}>
                            <span>{user}</span>
                            <div className="icon"></div>
                        </Nav.Item>
                    )
                })
            }
        </Nav>
    )
}
