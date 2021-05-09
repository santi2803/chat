import React from 'react'

export default function Message({ msg, user }) {
    const date = new Date(msg.date);
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = "0"+minutes
    }
    return (
        msg.user === user ? (
            <div className="message me">
                <div className="msg-bubble">
                    <div className="msg-info">
                        <span className="user">
                            Yo merengues
                        </span>
                        <span className="time">
                            {date.getHours()}:{minutes}
                        </span>
                    </div>
                    <p className="msg">
                        {msg.message}
                    </p>
                </div>
            </div>
        ) : (
            <div className="message">
                <div className="msg-bubble">
                    <div className="msg-info">
                        <span className="user">{msg.user}</span>
                        <span className="time">
                            {date.getHours()}:{minutes}
                        </span>
                    </div>
                    <p className="msg">
                        {msg.message}
                    </p>
                </div>
            </div>
        )
    )
}
