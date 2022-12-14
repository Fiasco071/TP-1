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
  # user_id = db.Column(db.Integer, nullable=False) # whoever gets assigned to this task
  # use a join table this
  
  # id        1     2     3
  # task_id   1     1     1
  # user_id   1     2     3
  project_id = db.Column(db.Integer, ForeignKey('projects.id'), nullable=True)
  active = db.Column(db.Boolean, default=True, nullable=False)
  created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
  updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

  comments = db.relationship('Comment', back_populates='task')

  task_owner = db.relationship('User', back_populates='task')
  project = db.relationship('Project', back_populates='task')
  thread = db.relationship('Thread', back_populates='task')
  message = db.relationship('Message', back_populates='task')
  employee_assignment = db.relationship('EmployeeAssignment', back_populates='task')
  tracked = db.relationship('TrackedTask', back_populates='task')


  def to_dict(self):
    return {
      'id': self.id,
      'title': self.title,
      'due_date': self.due_date,
      'content': self.content,
      'creator_id': self.creator_id,
      'task_owner': self.task_owner.to_dict_username(),
      'project_id': self.project_id,
      'active': self.active,
      'comments': [comment.to_dict() for comment in self.comments],
      'project_detail' : self.project.to_dict_project_name(),
      'tracked' : [track.to_dict_task() for track in self.tracked],
      'created_at': self.created_at,
      'updated_at': self.updated_at
    }
