import os
import json
import logging
import eventlet
from app.models import db, Room, direct_message
from flask import Blueprint, request
from flask_login import current_user
from flask_socketio import SocketIO, emit, send, join_room, leave_room
from app.models import db, DirectMessage, User
from flask_login import current_user

if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://actual-app-url.herokuapp.com",
        "https://actual-app-url.herokuapp.com"
    ]
else:
    origins = "*"

socketio = SocketIO(cors_allowed_origins=origins)

room_routes = Blueprint('rooms', __name__)


# chat_users = {}

# def add_user(username, roomname, sid):
#     user = {'name': username.upper(), 'room': roomname.upper(), 'sid': sid}
#     join_room(roomname)
#     chat_users[sid] = user


# def get_user_by_sid(sid):
#     if sid in chat_users:
#         return chat_users[sid]
#     return None


# def get_user_by_name(name):
#     for key, value in chat_users.items():
#         if value['name'] == name.upper():
#             return value
#     return None


# def del_user(sid, roomname):
#     elm = None
#     if sid in chat_users:
#         elm = chat_users[sid]
#         leave_room(roomname)
#         del chat_users[sid]
#     return elm


# def get_all_users(roomname):
#     all_users = []
#     for key, value in chat_users.items():
#         if value['room'] == roomname.upper():
#             all_users.append(value['name'])
#     return all_users


# @socketio.on('chat')
# def handle_chat(message):
#     logging.debug('Chat for session % received: %s' % (request.sid, message))
#     try:
#         evt = message['event'] if 'event' in message else 'users'
#         if evt == 'join':
#             user = message['user'] if 'user' in message else 'JDOE'
#             room = message['room'] if 'room' in message else 'PARKED'
#             add_user(user, room, request.sid)
#             msg2send = {
#                 'type': 'newuser',
#                 'message': 'New User %s joined room %s' % (user, room)
#             }
#             socketio.emit('chat', msg2send, room=room)
#         elif evt == 'leave':
#             user = message['user'] if 'user' in message else 'JDOE'
#             room = message['room'] if 'room' in message else 'PARKED'
#             del_user(request.sid, room)
#             msg2send = {
#                 'type': 'deluser',
#                 'message': 'User %s left room %s' % (user, room)
#             }
#             socketio.emit('chat', msg2send, room=room)
#         elif evt == 'users':
#             room = message['room'] if 'room' in message else 'PARKED'
#             all_users = get_all_users(room)
#             msg2send = {
#                 'type': 'users',
#                 'message': 'Users in room: ' + str(all_users)
#             }
#             socketio.emit('chat', msg2send, room=request.sid)
#         elif evt == 'chat':
#             me = get_user_by_sid(request.sid)
#             room = message['room'] if 'room' in message else None
#             user = message['user'] if 'user' in message else None
#             text = message['text'] if 'text' in message else 'Knock! Knock!'
#             msg2send = {
#                 'type': 'chat',
#                 'from': me['name'],
#                 'message': text
#             }
#             if room is None:
#                 # Broadcast
#                 logging.debug('Broadcasting message...')
#                 socketio.emit('chat', msg2send, skip_sid=request.sid, broadcast=True)
#             else:
#                 if user is None:
#                     # Send to everyone in room
#                     socketio.emit('chat', msg2send, skip_sid=request.sid, room=room)
#                 else:
#                     elm = get_user_by_name(user)
#                     if elm is not None:
#                         logging.debug('Sending chat message to user %s at socket: %s' % (user, elm['sid']))
#                         socketio.emit('chat', msg2send, room=elm['sid'], skip_sid=request.sid)
#                     else:
#                         logging.error('User requested %s, not found...' % user)
#         elif evt == 'image':
#             me = get_user_by_sid(request.sid)
#             msg2send = {
#                 'type': 'image',
#                 'from': me['name'],
#                 'bimage': message['bimage']
#             }
#             socketio.emit('chat', msg2send, skip_sid=request.sid, room=message['room'])
#     except json.decoder.JSONDecodeError as jse:
#         send(json.dumps({ 'code': 99, 'message': 'JSON Parse failed' }))



@room_routes.route('/')
def room():
  rooms = Room.query.all()
  return {'rooms': [room.to_dict() for room in rooms]}


@room_routes.route('/new', methods=["POST"])
def make_room(data):
    room = Room(
        user_1 = data["user_1"],
        user_2 = data["user_2"]
    )
    db.session.add(room)
    db.session.commit()


@socketio.on("dm")
def handle_chat(data):
    print(data, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<****************##______^^^^ data")
    direct_message = DirectMessage(
        content = data["content"],
        room_id = data["roomid"],
        user_id = data["id"]
    )
    db.session.add(direct_message)
    db.session.commit()
    emit('dm', data, broadcast = True)




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
