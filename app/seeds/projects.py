from app.models import db, Project
from datetime import datetime

def seed_projects():
    project_1 = Project(
        title="this is the first project title", content="optional content 1", due_date=datetime(2022, 10, 10,12,00), user_id=1
    )
    project_2 = Project(
        title="this is the second project title", content="optional content 2", due_date=datetime(2022, 11, 10,12,00), user_id=1
    )

    for project in [project_1, project_2]:
        db.session.add(project)
    db.session.commit()

def undo_projects():
  db.session.execute('TRUNCATE projects RESTART IDENTITY CASCADE;')
  db.session.commit()
