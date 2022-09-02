import os
from flask_socketio import SocketIO, emit

if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://actual-app-url.herokuapp.com",
        "https://actual-app-url.herokuapp.com"
    ]
else:
    origins = "*"

socketio = SocketIO(cors_allowed_origins=origins)

@socketio.on("dm")
def handle_chat(data):
    emit("dm", data, broadcast=True)
