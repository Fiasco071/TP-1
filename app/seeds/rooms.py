from app.models import db, Room

def seed_rooms():
    room_1 = Room(
        user_1 = 1, user_2 = 2
    )

    for room in [room_1]:
        db.session.add(room)
    db.session.commit()



def undo_rooms():
  db.session.execute('TRUNCATE rooms RESTART IDENTITY CASCADE;')
  db.session.commit()
