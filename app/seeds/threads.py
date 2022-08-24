from app.models import db, Thread


def seed_threads():
    thread_1 = Thread(
        title="this is the first thread title", user_id=1, task_id=1, project_id=1
    )

    for thread in [thread_1]:
        db.session.add(thread)
    db.session.commit()



def undo_threads():
  db.session.execute('TRUNCATE threads RESTART IDENTITY CASCADE;')
  db.session.commit()
