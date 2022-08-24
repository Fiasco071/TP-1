from .db import db
from sqlalchemy.sql import func

class EmployeeAssignments(db.Model):
  __tablename__ = 'employee_assignments'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, nullable=False)
  task_id = db.Column(db.Integer, nullable=False)
  project_id = db.Column(db.Integer, nullable=False)
  created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
  updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
