from .db import db

class Message(db.Model):
  __tablename__ = 'messages'

  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String(100), nullable=False)
  content = db.Column(db.String(2000), nullable=True)
  thread_id = db.Column(db.Integer, nullable=False)
  user_id = db.Column(db.Integer, nullable=False)
  task_id = db.Column(db.Integer, nullable=True)
  project_id = db.Column(db.Integer, nullable=False)
  created_at = db.Column(db.DateTime, nullable=False)
  updated_at = db.Column(db.DateTime, nullable=False)
