from .db import db
from sqlalchemy.sql import func

class Project(db.Model):
  __tablename__ = 'projects'

  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String(100), nullable=False)
  content = db.Column(db.String(1000), nullable=True)
  due_date = db.Column(db.DateTime, nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
  updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

  user = db.relationship("User", back_populates="project")
  message = db.relationship("Message", back_populates="project")
  thread = db.relationship("Thread", back_populates="project")
  task = db.relationship("Task", back_populates="project")
  employee_assignment = db.relationship("EmployeeAssignment", back_populates="project")

  def to_dict(self):
    return {
      'id': self.id,
      'title': self.title,
      'content': self.content,
      'due_date': self.due_date,
      'created_at': self.created_at,
      'user_id': self.user_id,
      'updated_at': self.updated_at,
      # 'messages': [msg.to_dict() for msg in self.message],
      # 'tasks': [tsk.to_dict() for tsk in self.task],
      # 'threads': [thrd.to_dict() for thrd in self.thread]
    }
