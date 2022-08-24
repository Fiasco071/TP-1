from .db import db

class Task(db.Model):
  __tablename__ = 'tasks'

  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String(100), nullable=False)
  due_date = db.Column(db.Date, nullable=True)
  content = db.Column(db.String(1000), nullable=True)
  creator_id = db.Column(db.Integer, nullable=False)
  user_id = db.Column(db.Integer, nullable=False) # whoever gets assigned to this task
  project_id = db.Column(db.Integer, nullable=True)
  created_at = db.Column(db.DateTime, nullable=False)
  updated_at = db.Column(db.DateTime, nullable=False)

  def to_dict(self):
    return {
      'id': self.id,
      'title': self.title,
      'due_date': self.due_date,
      'content': self.content,
      'creator_id': self.creator_id,
      'user_id': self.user_id,
      'project_id': self.project_id,
      'created_at': self.created_at,
      'updated_at': self.updated_at
    }
