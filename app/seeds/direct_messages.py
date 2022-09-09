from app.models import db, DirectMessage


def seed_direct_messages():
    direct_message_1 = DirectMessage(
        content="hello this is content for direct messaging",
        room_id = 1,
        user_id = 1
    )

    for direct_message in [direct_message_1]:
        db.session.add(direct_message)
    db.session.commit()



def undo_direct_messages():
  db.session.execute('TRUNCATE direct_messages RESTART IDENTITY CASCADE;')
  db.session.commit()
