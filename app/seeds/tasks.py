from app.models import db, Task
from datetime import datetime

def seed_tasks():
  first = Task(
    title ='Task',
    due_date = datetime.now(),
    content = 'Content stuff',
    creator_id = 1,
    user_id = 2,
    created_at = datetime.now(),
    updated_at = datetime.now()
  )
  second = Task(
    title ='Task',
    due_date = datetime.now(),
    content = 'Content stuff',
    creator_id = 1,
    user_id = 2,
    created_at = datetime.now(),
    updated_at = datetime.now()
  )

  db.session.add(first)
  db.session.add(second)
  db.session.commit()

def undo_tasks():
  db.session.execute('TRUNCATE tasks RESTART IDENTITY CASCADE;')
  db.session.commit()
