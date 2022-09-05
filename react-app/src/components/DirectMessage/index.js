import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { io } from 'socket.io-client';
import './style.css';

let socket;

const DirectMessage = () => {
    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState([]);
    const user = useSelector(state => state.session.user)
    const [recipient, setRecipient] = useState(2)  // useState for recipients id, quick: dropdown selector, best: input with autocomplete



    useEffect(() => {
        socket = io();

        // io.on("connection", socket => {
        //     socket.on("private message", (anotherSocketId, msg) => {
        //       socket.to(anotherSocketId).emit("private message", socket.id, msg);
        //     });
        //   });

        socket.on("dm", (chat) => {
            setMessages(messages => [...messages, chat])
        })

        return (() => {
            socket.disconnect()
        })
    }, [])

    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    };

    const sendChat = (e) => {
        e.preventDefault()
        socket.emit("dm", { id: user.id, user: user.username, content: chatInput }); // include recipient id here
        setChatInput("")
    }

    return (user && (
        <div id="container">
            <div id="dm-header">
                <div id="dm-grp-img">
                    <img class="i1" src="https://images.unsplash.com/photo-1660476705851-21e527337f9a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60" alt="" />
                    <img class="i2" src="https://images.unsplash.com/photo-1657299143482-4f4ea1ebd71c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60" alt="" />
                    <img class="i3" src="https://images.unsplash.com/photo-1660481451479-7ad6d6ad0223?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60" alt="" />
                </div>
                <div id="dm-grp-info">
                    <h3 class="dm-grp-name">
                        Steve, Damian, Jared
                    </h3>
                </div>
            </div>
            <div id="dm-chatbox">
                {messages.map((message, ind) => (
                    <div id="dm-chat">
                        <p id="dm-msg">
                            <div key={ind}>{`${message.user}: ${message.content}`}</div>
                        </p>
                    </div>
                ))}
            </div>

            <div id="dm-chat-form">
                <form id="dm-form" onSubmit={sendChat}>
                    <input
                        id="dm-chat-input"
                        value={chatInput}
                        onChange={updateChatInput}
                    />
                    <div></div>
                    <button id="dm-submit" type="submit" disabled={chatInput ? false : true}>Send</button>
                </form>
            </div>
        </div>
    )
    )
};


export default DirectMessage;
