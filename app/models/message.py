from .db import db
from sqlalchemy.sql import func

class Message(db.Model):
  __tablename__ = 'messages'

  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String(100), nullable=False)
  content = db.Column(db.String(2000), nullable=True)
  thread_id = db.Column(db.Integer, db.ForeignKey("threads.id"), nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  task_id = db.Column(db.Integer, db.ForeignKey("tasks.id"), nullable=False)
  project_id = db.Column(db.Integer, db.ForeignKey("projects.id"), nullable=False)
  created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
  updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

  user = db.relationship("User", back_populates="message")
  project = db.relationship("Project", back_populates="message")
  thread = db.relationship("Thread", back_populates="message")
  task = db.relationship("Task", back_populates="message")

  def to_dict(self):
    return {
      'id': self.id,
      'title': self.title,
      'content': self.content,
      'thread_id': self.thread_id,
      'user_id': self.user_id,
      'task_id': self.task_id,
      'created_at': self.created_at,
      'updated_at': self.updated_at
    }
