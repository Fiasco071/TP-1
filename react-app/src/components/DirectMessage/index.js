import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from 'socket.io-client';
import { getAllRooms, createRoom, deleteRoom } from "../../store/room";
import { getAllProjects } from "../../store/project";
import { getAllUsers } from "../../store/user";
import './style.css';

let socket;

const DirectMessage = () => {
    const dispatch = useDispatch()
    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState([]);
    const user = useSelector(state => state.session.user)
    const users = useSelector(state => Object.values(state?.users))
    const rooms = useSelector(state => Object.values(state?.room))
    const [chat, setChat] = useState(false)
    const [recipient, setRecipient] = useState()  // useState for recipients id, quick: dropdown selector, best: input with autocomplete

    // console.log(rooms, users, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<USERS")

    useEffect(() => {
        dispatch(getAllRooms())
        dispatch(getAllUsers())
    }, [dispatch])

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

    // need use state to set window active, once active, need a form to add users to a chat, need tabs for rooms

    const sendChat = (e) => {
        e.preventDefault()
        socket.emit("dm", { id: user.id, user: user.username, content: chatInput }); // include recipient id here
        setChatInput("")
    }

    return (user && (
        <div id="container">
            <div id="dm-header">
                <div id="dm-grp-img">
                    <img className="i1" src="https://images.unsplash.com/photo-1660476705851-21e527337f9a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60" alt="" />
                    <img className="i2" src="https://images.unsplash.com/photo-1657299143482-4f4ea1ebd71c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60" alt="" />
                    <img className="i3" src="https://images.unsplash.com/photo-1660481451479-7ad6d6ad0223?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60" alt="" />
                </div>
                <div id="dm-grp-info">
                    <h3 className="dm-grp-name">
                        Steve, Damian, Jared
                    </h3>
                </div>
            </div>
            <div id="dm-chatbox">
                {messages.map((message, ind) => (
                    <div key={ind} id="dm-chat">
                        <p id="dm-msg">
                            <div>{`${message.user}: ${message.content}`}</div>
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
