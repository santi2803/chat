import React from 'react';
import { Nav } from 'react-bootstrap';

export default function UsersBar({ users }) {
    return (
        <Nav className="col-md-12 d-md-block bg-dark p-4 user-bar">
            {
                users.map(user => (
                    <Nav.Item className="item p-4" key={user}>
                        <span>{user}</span>
                        <div className="icon"></div>
                    </Nav.Item>
                ))
            }
        </Nav>
    )
}
