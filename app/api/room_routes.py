import os
from app.models import db, Room
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

# @socketio.on("dm")  # additional decorators not working
@room_routes.route('/')
def room():
#   room = Room(
#       user_1 = data["user_1"],
#       user_2 = data["user_2"],
#       )
#   db.session.add(room)
#   db.session.commit()
#   emit('dm', data, to = room, broadcast = True)
  users = User.query.all()
  rooms = Room.query.all()
  return {'users': [user.to_dict() for user in users], 'rooms': [room.to_dict() for room in rooms]}

# @socketio.on("dm")
# def handle_chat(data):
#     emit("dm", data, broadcast=True)
