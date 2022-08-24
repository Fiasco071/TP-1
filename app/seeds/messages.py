from app.models import db, Message

def seed_messages():
    message_1 = Message(
        title="hello this is a title message", content="hello this is content",
        thread_id=1, user_id=1, task_id=1, project_id=1
    )
    message_2 = Message(
        title="hello this is the second title message", content="hello this is the second content",
        thread_id=1, user_id=1, task_id=1, project_id=1
    )

    for message in [message_1, message_2]:
        db.session.add(message)
    db.session.commit()

def undo_messages():
  db.session.execute('TRUNCATE messages RESTART IDENTITY CASCADE;')
  db.session.commit()
