import os
from app.models import db, Room, direct_message
from flask import Blueprint, request
from flask_login import current_user
from flask_socketio import SocketIO, emit, send
from app.models import db, DirectMessage, User
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

room_routes = Blueprint('rooms', __name__)


@room_routes.route('/')
def room():
  users = User.query.all()
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
    direct_message = DirectMessage(
        content = data["content"],
        room_id = data["roomid"]
    )
    db.session.add(direct_message)
    db.session.commit()
    emit('dm', data, to = data["roomid"], broadcast = True)




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
