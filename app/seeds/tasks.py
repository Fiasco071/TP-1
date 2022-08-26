from app.models import db, Task
from datetime import datetime

def seed_tasks():
  first = Task(
    title ='Task number 1',
    due_date = datetime.now(),
    content = 'Content stuff 1',
    project_id = 1,
    creator_id = 1,
    user_id = 2
  )
  second = Task(
    title ='Task number 2 / more important stuff',
    due_date = datetime.now(),
    content = 'Content stuff for 2',
    project_id = 1,
    creator_id = 1,
    user_id = 2
  )

  db.session.add(first)
  db.session.add(second)
  db.session.commit()

def undo_tasks():
  db.session.execute('TRUNCATE tasks RESTART IDENTITY CASCADE;')
  db.session.commit()
