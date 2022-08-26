from sqlalchemy.sql import func
from sqlalchemy import ForeignKey
from .db import db

class Task(db.Model):
  __tablename__ = 'tasks'

  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String(100), nullable=False)
  due_date = db.Column(db.Date, nullable=True)
  content = db.Column(db.String(1000), nullable=True)
  creator_id = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)
  user_id = db.Column(db.Integer, nullable=False) # whoever gets assigned to this task
  project_id = db.Column(db.Integer, ForeignKey('projects.id'), nullable=True)
  created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
  updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

  task_owner = db.relationship('User', back_populates='task')
  project = db.relationship('Project', back_populates='task')
  thread = db.relationship('Thread', back_populates='task')
  message = db.relationship('Message', back_populates='task')
  employee_assignment = db.relationship('EmployeeAssignment', back_populates='task')


  def to_dict(self):
    return {
      'id': self.id,
      'title': self.title,
      'due_date': self.due_date,
      'content': self.content,
      'creator_id': self.creator_id,
      'task_owner': self.task_owner.to_dict_username(),
      'user_id': self.user_id,
      'project_id': self.project_id,
      # 'project_detail' : self.project.to_dict_project_name(),
      'created_at': self.created_at,
      'updated_at': self.updated_at
    }
