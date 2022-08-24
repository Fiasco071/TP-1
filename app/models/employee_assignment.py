from .db import db
from sqlalchemy.sql import func

class EmployeeAssignment(db.Model):
  __tablename__ = 'employee_assignments'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  task_id = db.Column(db.Integer, db.ForeignKey("tasks.id"), nullable=False)
  project_id = db.Column(db.Integer, db.ForeignKey("projects.id"), nullable=False)
  created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
  updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

  # user = db.relationship("User", back_populates="employee_assignment")
  # task = db.relationship("Task", back_populates="employee_assignment")
  # project = db.relationship("Project", back_populates="employee_assignment")

  def to_dict(self):
    return {
      'id': self.id,
      'user_id': self.user_id,
      'task_id': self.task_id,
      'project_id': self.project_id,
      'created_at': self.created_at,
      'updated_at': self.updated_at
    }
