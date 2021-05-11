import React, { Component } from 'react';
import { Fragment } from 'react';
import { Container, FormControl, InputGroup, Row, Button, Alert } from 'react-bootstrap'

import styles from './Index.module.css'

export default class Index extends Component {

    state = {
        data: {},
        alert: {
            show: false,
            message: ""
        }
    }

    onClose() {
        this.setState({
            alert: {
                show: false,
                message: ""
            }
        })
    }

    onChange(e) {
        let { data } = this.state;
        const { name, value } = e.target;

        data[name] = value;

        this.setState({
            data
        })

    }

    send(data) {
        if (Object.keys(data).length === 0) {
            this.setState({
                alert: {
                    show: true,
                    message: "Porfavor ingresa un username"
                }
            })
            return;
        }

        localStorage.setItem("user", data.username);

        this.props.history.push("/chats")
    }

    onKeyPress(e) {
        const { data } = this.state;
        if (e.key === "Enter") {
            this.send(data);
        }
    }

    render() {
        const { data, alert } = this.state;
        return (
            <Fragment>
                {
                    alert.show ? (
                        <Alert 
                            variant="danger" 
                            onClose={this.onClose.bind(this)} 
                            className={styles.alert}
                            dismissible
                        >
                            {alert.message}
                        </Alert>
                    ) : 
                    <></>
                }
                <Container fluid className="container">
                    <Row>
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Username"
                                aria-label="Username"
                                name="username"
                                aria-describedby="basic-addon1"
                                onChange={this.onChange.bind(this)}
                                onKeyDown={this.onKeyPress.bind(this)}
                            />
                            <InputGroup.Append>
                                <Button
                                    variant="outline-secondary"
                                    onClick={() => this.send(data)}
                                >
                                    Go
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Row>
                </Container>
            </Fragment>
        )
    }
}
