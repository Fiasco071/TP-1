import os
from flask_socketio import SocketIO, emit, send
from app.models import db, DirectMessage
from flask_login import current_user
from flask_socketio import join_room, leave_room

if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://actual-app-url.herokuapp.com",
        "https://actual-app-url.herokuapp.com"
    ]
else:
    origins = "*"

socketio = SocketIO(cors_allowed_origins=origins)

# Needs redux store
# User adds up to 4 users on frontend, after adding first user, creates a room with 2 ids, user and receiver, and 2 null ids ->
# Rooms Table (up to 4 users) ->
# Messages (each user pulls the messages from that room), Messages get assigned to a Room ID

@socketio.on("dm")
def handle_chat(data):
    direct_messages = DirectMessage.query.filter(DirectMessage.sender == current_user.id).all()
    emit("dm", data, broadcast=True)


## Error when enabled ? Also might have to rearrange table, have to figure out roomid and groups
# The WebSocket transport is not available, you must install a WebSocket server that is compatible with your async mode to enable it.
# See the documentation for details. (further occurrences of this error will be logged with level INFO)


#   to individual socketid (private message)
#   io.to(socketId).emit(/* ... */);

# @socketio.on('join')
# def on_join(data):
#     username = data['username']
#     room = data['room']
#     join_room(room)
#     send(username + ' has entered the room.', to=room)

# @socketio.on('leave')
# def on_leave(data):
#     username = data['username']
#     room = data['room']
#     leave_room(room)
#     send(username + ' has left the room.', to=room)

# def save_message(msg):
#   print(msg, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< messages")
# #   groupid = group.query.filter(group.groupid == msg["roomid"]).first()
#   save = DirectMessage(
#       content = msg["content"],
#       sender = 1,
#       receiver = 2
#       )
#   db.session.add(save)
# #   groupid.message.append(save)
#   db.session.commit()

# @socketio.on("dm")
# def handle_chat(message):
#   print(message)
# #   message["sender"] = current_user.username
#   emit('dm', message, broadcast = True)
#   # emit('add_element', message, to = message["roomid"], broadcast = True)
#   save_message(message)


#   // to all clients in the current namespace except the sender
#   socket.broadcast.emit(/* ... */);

#   // to all clients in room1 except the sender
#   socket.to("room1").emit(/* ... */);

#   // to all clients in room1 and/or room2 except the sender
#   socket.to("room1").to("room2").emit(/* ... */);

#   // to all clients in room1
#   io.in("room1").emit(/* ... */);

#   // to all clients in namespace "myNamespace"
#   io.of("myNamespace").emit(/* ... */);

#   // to all clients in room1 in namespace "myNamespace"
#   io.of("myNamespace").to("room1").emit(/* ... */);

#   // to individual socketid (private message)
#   io.to(socketId).emit(/* ... */);
