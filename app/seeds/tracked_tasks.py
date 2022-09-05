from app.models import db, TrackedTask

def seed_tracked_tasks():
    tracked_task_1 = TrackedTask(
        task_id=1,
        user_id=1
    )
    tracked_task_2 = TrackedTask(
        task_id=2,
        user_id=1
    )

    for tracked_task in [tracked_task_1, tracked_task_2]:
        db.session.add(tracked_task)
    db.session.commit()

def undo_tracked_tasks():
  db.session.execute('TRUNCATE tracked_tasks RESTART IDENTITY CASCADE;')
  db.session.commit()
